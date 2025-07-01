class FlappyBirdCharacter extends CharacterBody2D{

    _hasCollision = false
    _isColliding = false
    _collisionShapes = []

    //idle bird bounce options
    initialY = 300
    YDelta = 6
    idleFlyBounceMultiplier=1/120



   childrenJSON = [
        {
            type: 'Sprite2D',
            name: 'flappySprite',
            properties: {
                sprite: window.app.loader.getSprite('yellowbird-midflip'),
                scaleMode: 'original',
                position:{
                    X:0,
                    Y:0
                },
                origin:{
                    X:0.5,
                    Y:0.5
                },
                offset:{
                    X: 0,
                    Y: 0
                },
                scale:0.8,
                rotation:0,
                updateScoreCallback : null,
                // positionMode: 'fixed'
            },
            childrenJSON: []
        },
        {
            type: 'CollisionShape2D',
            name: 'flappyCollision',
            properties: {
                position:{
                    X:0,
                    Y:0
                },
                origin:{
                    X:0.5,
                    Y:0.5
                },
                offset:{
                    X: 0,
                    Y: 0
                },
                width: 56,
                height: 46
            },
            childrenJSON: []
        },
        {
            type: 'SoundPlayer',
            name: 'flappySound',
            properties: {
                soundList:{
                    'die': window.app.loader.getAudio('die'),
                    'swoosh': window.app.loader.getAudio('swoosh'),
                    'point': window.app.loader.getAudio('point'),
                    'hit': window.app.loader.getAudio('hit'),
                    'wing': window.app.loader.getAudio('wing')
                },
                loop: false,
                muted: false,
            },
            childrenJSON: [

            ]
        }
    ]

    constructor(properties, childrenJSON){
        const defaultProperties={
            origin:{
                X:0,
                Y:0
            },
            position:{
                X:0,
                Y:0
            },
            offset:{
                X:0,
                Y:0
            },
            velocity:{
                X: 0,
                Y: 0
            },
            force:{
                X: 0,
                Y: 0
            },
            mass: 1,
            hasPhysics: false,
            doesBounce: false,
            jumpSpeed: -0.45,
            
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)

        this.handleCollision = this.handleCollision.bind(this)
        this.getCollisionShapes = this.getCollisionShapes.bind(this)
    }

    handleCollision(){
        if(this._hasCollision){
            const collisionResult = CollisionObject2D.detectCollisions(this)
            // collisionResult !=null && collisionResult!= null && console.log('colresult', collisionResult)
            
            if(collisionResult !=undefined && collisionResult!=null){
                // alert('ee')

                if(collisionResult.velocity != undefined && collisionResult.velocity != null){
                    this.properties.velocity = {...collisionResult.velocity}
                    if(App.getState() == App.STATES.PLAYING){
                        App.setState(App.STATES.GAME_OVER)
                        this.getChild('flappySound').play('hit').catch(error => console.error(error)).then((e)=>{
                            console.log('sound '+ 'hit' + ' played')
                        })
                    }
                }else{
                    if(!this._isColliding){
                        this._isColliding = true;
                        App.addScore(1);
                        this.properties.updateScoreCallback?this.properties.updateScoreCallback():null;
    
                        this.getChild('flappySound').play('point').catch(error => console.error(error)).then((e)=>{
                        })
                    }
                }

                // this.properties.velocity.X = collisionResult.velocity.X != undefined && collisionResult.velocity.X != null?collisionResult.velocity.X:this.properties.velocity.X
                // this.properties.velocity.Y = collisionResult.velocity.Y != undefined && collisionResult.velocity.Y != null?collisionResult.velocity.Y:this.properties.velocity.Y
            }else{
                this._isColliding=false

            }
        }
    }

    _physicalProcess(delta){
        const movingForwardSpeed = 0.2
        if(App.getState() == App.STATES.READY_TO_START){
        }else if(App.getState() == App.STATES.PLAYING){
            this.properties.velocity.X = movingForwardSpeed
            // if(this.properties.position.X>500){
            //     this.properties.position.X = 0
            // }

        }else if(App.getState() == App.STATES.GAME_OVER){
        }
        if(this.properties.hasPhysics){
            const PIXELS_PER_METER = 5
            const G = 9.81 / PIXELS_PER_METER;
            // console.log('running _physicalProcess of:(delta=' + delta + ')', this, (this.properties.force.Y/this.properties.mass + G) * delta / 1000)
            this.properties.velocity.X += (this.properties.force.X/this.properties.mass) * delta
            this.properties.velocity.Y += (this.properties.force.Y/this.properties.mass + G) * delta
        }

        if(this._hasCollision){
            this.handleCollision()
        }

    }

    _process(delta){
        const fallSpeedThreshold = 1.2
        const rotateSpeedThreshold = 0.20;
        const angleAtFaceUp = -Math.PI/10;
        const angleAtFaceDown = Math.PI/2
        let degree;
        if(App.getState() == App.STATES.READY_TO_START){
            this.properties.position.Y = this.initialY + this.YDelta * Math.sin(Date.now()*this.idleFlyBounceMultiplier);
        }else if(App.getState() == App.STATES.PLAYING){
            const fallSpeed = Math.min(this.properties.velocity.Y, fallSpeedThreshold) 
            degree = angleAtFaceUp
            if(fallSpeed>rotateSpeedThreshold){// we only start to rotate if bird is moving down faster than threshold
                degree = angleAtFaceUp + (fallSpeed-rotateSpeedThreshold) * (angleAtFaceDown - angleAtFaceUp)/(Math.abs(fallSpeedThreshold-rotateSpeedThreshold))
                //            degree = fallSpeed * angleAtFaceDown/Math.abs(fallSpeedThreshold)
            }
            this.getChild('flappySprite').properties.rotation = Math.sin(degree) * Math.PI/2;
        }else if(App.getState() == App.STATES.GAME_OVER){
        degree = angleAtFaceDown
            this.getChild('flappySprite').properties.rotation = Math.sin(degree) * Math.PI/2;
        }

        // console.log('running _Process of:(delta=' + delta + ')', this)
        this.properties.position.X += this.properties.velocity.X * delta
        this.properties.position.Y += this.properties.velocity.Y * delta
    }

}