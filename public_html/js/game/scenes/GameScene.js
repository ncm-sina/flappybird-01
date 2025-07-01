"use strict";

class GameScene extends Scene{

    isGameOver=false

    handleKeyDownUUID = null
    handleMouseClickUUID = null


    childrenJSON = [
        {
            type: 'Camera2D',
            name: 'defaultCamera',
            properties:{
                position:{
                    X:240,
                    Y:320
                },
                origin:{
                    X: 0.5,
                    Y: 0.5
                },
                viewWidth: 480,
                viewHeight: 640,
                showCameraRect: true,
                default: true
            },
            childrenJSON:[]
        },        
        {
            type: "Sprite2D",
            name: "backgroundImage",
            properties: {
                sprite: window.app.loader.getSprite('background-day'),
                scaleMode: 'fill-w',
                offset:{
                    X: 0,
                    Y: 65
                },
                width: '100%',
                height: '100%',
                positionMode: 'fixed',
            },
            childrenJSON: [
            ],
            
        },
        // {
        //     type: "Sprite2D",
        //     name: "backgroundImage",
        //     properties: {
        //         sprite: window.app.loader.getSprite('background2-day'),
        //         scaleMode: 'fill-w',
        //         offset:{
        //             X: 250,
        //             Y: 50
        //         },
        //         offset2:{
        //             X: 950,
        //             Y: 0
        //         },
        //         width: '100%',
        //         height: '100%'
        //     },
        //     childrenJSON: [
        //     ],
        // },
        {
            type: "AudioStreamPlayer",
            name: "backgroundMusic",
            properties: {
                source: window.app.loader.getAudio('background-music-1'),
                loop: true,
                muted: false,
                autoplay: true,
            },
            childrenJSON: [
            ],
        },
        {
            type: 'Pipe2DGenerator',
            name: 'levelGenerator',
            properties:{
                position:{
                    X: 0,
                    Y: 285
                },
                origin:{
                    X: 0.5,
                    Y: 0.5
                },
                deadZone:{
                    left: 100,
                    right: 400
                },
                pipeDistance: 300,
                firstPipeLocation:1000,
                width:480,
                height:570,
                pipeCount:100
            },
            childrenJSON:[

            ]
        },
        // {
        //     type: 'Pipe2D',
        //     properties:{
        //         position:{
        //             X: 50,
        //             Y: 0
        //         },
        //         width: 85,
        //         gapY: 300 /*between gapheight, 640 - gapheight*/,
        //         height: 570
        //     },
        //     childrenJSON:[

        //     ]
        // },
        {
            type: 'FlappyBirdCharacter',
            name: 'flappyBird',
            properties:{
                position:{
                    X:210,
                    Y:300
                },
                origin:{
                    X:0.5,
                    Y:0.5
                },
                hasPhysics: false,
                mass: 1,
                // positionMode: 'fixed',
                updateScoreCallback: null
            },
            childrenJSON:[
            ]
        },
        {
            type: 'StaticBody2D',
            name: 'ground',
            properties: {
                positionMode: 'fixed',                
            },
            childrenJSON:[
                {
                    type: 'Sprite2D',
                    name: 'groundSprite',
                    properties:{
                        sprite: window.app.loader.getSprite('base'),
                        position:{
                            X:0,
                            Y:570
                        },
                        origin:{
                            X:0,
                            Y:0
                        },
                        offset:{
                            X: 0,
                            Y: 0
                        },
                        offset2:{
                            X: 0,
                            Y: 0
                        },
                        width:480,
                        height: 70,
                        repeat: 'x',
                        scaleMode: 'fill-h',
                        positionMode: 'fixed'
                    }
                },
                {
                    type: 'CollisionShape2D',
                    name: 'groundCollision',
                    properties: {
                        position:{
                            X:0,
                            Y:570
                        },
                        origin:{
                            X:0,
                            Y:0
                        },
                        destinationOffset:{
                            X:0,
                            Y:0
                        },
                        width: '100vw',
                        positionMode: 'fixed',
                        height: 80
                    },
                    childrenJSON: []
                },
            ]
        },
        {
            type: 'BoxContainer',
            name: 'scoreContainer',
            properties:{
                position:{
                    X:240,
                    Y:200
                },
                origin: {
                    X:0.5,
                    Y:0.5
                },
                width: 100,
                height: 136,
                bgColor: 'rgb(222, 216, 149)',
                borderColor: 'rgb(84, 56, 71)',
                borderRadius:8,
                visible: false,
                positionMode: 'fixed',
            },
            childrenJSON: [
                {
                    type: 'Label',
                    name: 'currentScoreLabel',
                    properties: {
                        text: 'Score',
                        position:{
                            X:50,
                            Y:32
                        },
                        origin: {
                            X:0,
                            Y:0.5
                        },
                        Color: 'rgb(252, 120, 88)',
                        positionMode: 'fixed',
                        visible: false
                    }
                },
                {
                    type: 'Label',
                    name: 'bestScoreLabel',
                    properties: {
                        text: 'Best',
                        position:{
                            X:50,
                            Y:92
                        },
                        origin: {
                            X:0,
                            Y:0.5
                        },
                        Color: 'rgb(252, 120, 88)',
                        positionMode: 'fixed',
                        visible: false
                    }
                },
                {
                    type: 'ImageNumber',
                    name: 'currentScore',
                    properties: {
                        position:{
                            X:50,
                            Y:40
                        },
                        origin: {
                            X:0.5,
                            Y:0.5
                        },
                        scale: 0.4,
                        value: 3,
                        positionMode: 'fixed',
                        visible: false
                    },
                    childrenJSON: [
        
                    ]
                },
                {
                    type: 'ImageNumber',
                    name: 'bestScore',
                    properties: {
                        position:{
                            X: 50,
                            Y:102
                        },
                        origin: {
                            X:0.5,
                            Y:0.5
                        },
                        scale: 0.4,
                        value: 1,
                        positionMode: 'fixed',
                        visible: false
                    },
                    childrenJSON: [
        
                    ]
                },                        
            ]
        },
    ]

    constructor(name){
        const properties = {

        }
        super(properties);
        this.name = name
        // console.log('ss', this)

        this.handleKeydown = this.handleKeydown.bind(this)
        this.handleMouseClick = this.handleMouseClick.bind(this)
        this.restartScene = this.restartScene.bind(this)
        this.updateScoresGUI = this.updateScoresGUI.bind(this)
    }

    unload(){
        super.unload()
        if(this.handleKeyDownUUID != undefined && this.handleKeyDownUUID != null){
            App.unsubscribeKeyboardEvent(this.handleKeyDownUUID)
        }
        if(this.handleMouseClickUUID != undefined && this.handleMouseClickUUID != null){
            App.unsubscribeMouseEvent(this.handleMouseClickUUID)
        }
        
        
    }

    _init(){
        CollisionObject2D.flushCollisions();
        this.getChild('flappyBird').properties.updateScoreCallback =this.updateScoresGUI
    }

    _ready(){
        this.isGameOver = false
        const cam = this.getChild('defaultCamera')
        const flappyBird = this.getChild('flappyBird')
        if(cam!=undefined && cam!= null && flappyBird !=undefined && flappyBird != null){
            cam.properties.position.X = flappyBird.properties.position.X // camera should follow the flappyBird
            // cam.properties.position.X = flappyBird.getEffectivePosition().X + 30// camera should follow the flappyBird
        }

        App.setState(App.STATES.READY_TO_START)
        App.setScore(0)
        this.getChild('flappyBird').properties.hasPhysics = false
        this.getChild('currentScore').properties.visible = false
        this.getChild('currentScore').properties.value = App.getScore()
        this.getChild('bestScore').properties.value = App.getBestScore()
        this.getChild('flappyBird').properties.velocity={X:0, Y:0}

        this.handleKeyDownUUID = App.subscribeKeyboardEvent(this.handleKeydown)// should unsubscribe
        this.handleMouseClickUUID = App.subscribeMouseEvent(this.handleMouseClick) // should unsubscribe
    }

    _process(delta){
        if(!this.isGameOver){
    
            if(App.getState() == App.STATES.GAME_OVER){
                this.isGameOver=true;
                console.log('zzzzzzzzzzzzzzzzzz', App.getScore(), App.getBestScore(), Math.min(App.getScore(), App.getBestScore()))
                App.setBestScore(Math.max(App.getScore(), App.getBestScore()));

                this.updateScoresGUI();

                this.getChild('scoreContainer').properties.visible = true
                this.getChild('currentScore').properties.visible = true
                this.getChild('bestScore').properties.visible = true
                this.getChild('currentScoreLabel').properties.visible = true
                this.getChild('bestScoreLabel').properties.visible = true
                CollisionObject2D.flushCollisions();
                CollisionObject2D.registerCollision(this.getChild('groundCollision').getParentNode())
                CollisionObject2D.registerCollision(this.getChild('flappyCollision').getParentNode())
            }else if(App.getState() == App.STATES.READY_TO_START){
                // this.getChild('flappyBird').properties.position.Y = this.initialY + this.YDelta * Math.sin(Date.now()*this.idleFlyBounceMultiplier);
            }else if(App.getState() == App.STATES.PLAYING){
                const ground = this.getChild('groundSprite')
                const cam = this.getChild('defaultCamera')
                const flappyBird = this.getChild('flappyBird')
                if(cam!=undefined && cam!= null && ground!=undefined && ground != null){
                    ground.properties.destinationOffset.X = cam.properties.position.X; //* ground.properties.sprite.img.naturalHeight/ground.properties.height

                }
                if(cam!=undefined && cam!= null && flappyBird !=undefined && flappyBird != null){
                    cam.properties.position.X = flappyBird.properties.position.X    // camera should follow the flappyBird
                    // cam.properties.position.X = flappyBird.getEffectivePosition().X + 30// camera should follow the flappyBird
                }else{
                    console.error('wtf')
                }
                    // const fallSpeedThreshold = 0.8
                // const fallSpeed = Math.min(this.getChild('flappyBird').properties.velocity.Y, fallSpeedThreshold) 
                // let degree = -Math.PI/10 - (this.properties.jumpSpeed - fallSpeed) * (Math.PI/2 + Math.PI/10)/(Math.abs(this.properties.jumpSpeed) + Math.abs(fallSpeedThreshold))
                // this.getChild('flappySprite').properties.rotation = Math.sin(degree) * Math.PI/2;
            }
        }
    }

    updateScoresGUI(){
        this.getChild('currentScore').properties.value = App.getScore()
        this.getChild('bestScore').properties.value = App.getBestScore()
    }

    handleKeydown(keyCode){
        if(keyCode == 'Space'){
            // console.log('space pressed app state is:', App.getState())
            if(App.getState() == App.STATES.READY_TO_START){
                App.setState(App.STATES.PLAYING)
                this.getChild('flappyBird').properties.hasPhysics = true

                // App.setScore(0)
                this.getChild('currentScore').properties.value = App.getScore()
                this.getChild('currentScore').properties.visible = true

                this.getChild('flappyBird').properties.velocity={X:0, Y:this.getChild('flappyBird').properties.jumpSpeed}
                this.getChild('flappyBird').getChild('flappySound').play('wing').catch(error => console.error(error)).then((e)=>{
                    console.log('sound '+ 'wing' + ' played')
                })
            }else if(App.getState() == App.STATES.PLAYING){
                this.getChild('flappyBird').properties.velocity={X:0, Y:this.getChild('flappyBird').properties.jumpSpeed}
                this.getChild('flappyBird').getChild('flappySound').play('wing').catch(error => console.error(error))
                // .then((e)=>{
                //     console.log('sound '+ 'wing' + ' played')
                // })

            }else if(App.getState() == App.STATES.GAME_OVER){
                App.setState(App.STATES.NO_STATE)
                this.restartScene()
            }
        }
    }

    handleMouseClick({X,Y}){
        // console.log('space pressed app state is:', App.getState())
        if(App.getState() == App.STATES.READY_TO_START){
            App.setState(App.STATES.PLAYING)
            this.getChild('flappyBird').properties.hasPhysics = true

            // App.setScore(0)
            this.getChild('currentScore').properties.value = App.getScore()
            this.getChild('currentScore').properties.visible = true

            this.getChild('flappyBird').properties.velocity={X:0, Y:this.getChild('flappyBird').properties.jumpSpeed}
            this.getChild('flappyBird').getChild('flappySound').play('wing').catch(error => console.error(error)).then((e)=>{
                console.log('sound '+ 'wing' + ' played')
            })
        }else if(App.getState() == App.STATES.PLAYING){
            this.getChild('flappyBird').properties.velocity={X:0, Y:this.getChild('flappyBird').properties.jumpSpeed}
            this.getChild('flappyBird').getChild('flappySound').play('wing').catch(error => console.error(error))
            // .then((e)=>{
            //     console.log('sound '+ 'wing' + ' played')
            // })

        }else if(App.getState() == App.STATES.GAME_OVER){
            App.setState(App.STATES.NO_STATE)
            this.restartScene()
        }
        // if(App.getState() == App.STATES.READY_TO_START){
        //     App.setState(App.STATES.PLAYING)
        //     this.getChild('flappyBird').properties.hasPhysics = true
        //     this.getChild('currentScore').properties.visible = true
        //     this.getChild('currentScore').properties.value = 0
        //     this.getChild('flappyBird').properties.velocity={X:0, Y:this.getChild('flappyBird').properties.jumpSpeed}
        // }else if(App.getState() == App.STATES.PLAYING){
        //     this.getChild('flappyBird').properties.velocity={X:0, Y:this.getChild('flappyBird').properties.jumpSpeed}
        // }else if(App.getState() == App.STATES.GAME_OVER){
        //     App.setState(App.STATES.NO_STATE)
        //     this.restartScene()
        // }
    }

    restartScene(){
        window.app.loadScene(window.app.props.__startingSceneName);
    }

}