"use strict";

class Pipe2DGenerator extends Node2D{

    childrenJSON=[
    ]

    pipes=[]
    
    constructor(properties){
        const defaultProperties={
            position:{
                X: 0,
                Y: 0
            },
            origin:{
                X: 0.5,
                Y: 0.5
            },
            deadZone:{
                left: 100,
                right: 100
            },
            width: '100%',
            height: '100%',
            firstPipeLocation:100,
            pipeDistance: 200,
            pipeDistanceVariation: 0,
            pipeGapHeight: 200,
            pipeGapHeightVariation: 0,
            pipeGapPositionMin: 150,
            pipeGapPositionMax: -150,
            pipeGapPositionMaxChange: -1,
            pipeCount: 10,
        }
        properties = {...defaultProperties, ...properties}
        super(properties)

        this._drawPipe = this._drawPipe.bind(this)
        this._generatePipes = this._generatePipes.bind(this)
    }

    _ready(){
        // console.clear()
        // const upperPartSprite = this.getChild('upperPartSprite')
        // const lowerPartSprite = this.getChild('lowerPartSprite')
        // const upperPartCollision = this.getChild('upperPartCollision')
        // const lowerPartCollision = this.getChild('lowerPartCollision')
        // const passThroughCollision = this.getChild('passThroughCollision')
        // // console.warn(upperPart, lowerPart)
        // const pipeImageNaturalWidth = 52
        // const pipeImageNaturalHeight = 320
        // const pipeScreenHeight = this.getEffectiveHeight();
        // const pipeImageHeightScale = (pipeImageNaturalHeight/this.getEffectiveHeight())

        // upperPartSprite.properties.width = this.properties.width
        // upperPartSprite.properties.height = this.properties.gapY - this.properties.gapHeight/2
        // upperPartSprite.properties.offset.Y = ( pipeScreenHeight- upperPartSprite.properties.height) * pipeImageHeightScale

        // upperPartCollision.properties.width = upperPartSprite.properties.width
        // upperPartCollision.properties.height = upperPartSprite.properties.height

        // lowerPartSprite.properties.width = this.properties.width
        // lowerPartSprite.properties.height = pipeScreenHeight - this.properties.gapY - this.properties.gapHeight/2 
        // lowerPartSprite.properties.position.Y = (this.properties.gapY + this.properties.gapHeight/2)
        // lowerPartSprite.properties.offset2.Y = ( pipeScreenHeight- lowerPartSprite.properties.height) * pipeImageHeightScale

        // lowerPartCollision.properties.width = lowerPartSprite.properties.width
        // lowerPartCollision.properties.height = lowerPartSprite.properties.height
        // lowerPartCollision.properties.position.Y = lowerPartSprite.properties.position.Y

        // passThroughCollision.properties.width = 4
        // passThroughCollision.properties.height = this.properties.gapHeight - 40 // vertical offset
        // passThroughCollision.properties.position.Y = upperPartSprite.properties.height + 20
        // passThroughCollision.properties.position.X = this.properties.width/2 + 20 // 20 is some offset so that we count a pipe as passed if bird actually passes through it
        // console.log('pppppp',
        //      this.properties, passThroughCollision.properties
        // )
        this._generatePipes(this.properties.pipeCount)
    }

    _generatePipes(pipeCount){
        this.pipes=[];
        const minGapPosition = this.properties.pipeGapPositionMin
        const maxGapPosition = this.properties.pipeGapPositionMax<0?this.getEffectiveHeight() + this.properties.pipeGapPositionMax:this.properties.pipeGapPositionMax;
        let pipelocation,pipeGapHeight,pipeGapPosition;
        let plocation = this.properties.firstPipeLocation
        for(let i=0; i<pipeCount; i++){
            pipelocation = plocation + (this.properties.pipeDistanceVariation>0?Math.floor(Math.random() * this.properties.pipeDistanceVariation * 2) - this.properties.pipeDistanceVariation: 0)
            pipeGapHeight = this.properties.pipeGapHeight + (this.properties.pipeGapHeightVariation>0?Math.floor(Math.random() * this.properties.pipeGapHeightVariation * 2) - this.properties.pipeGapHeightVariation:0)
            pipeGapPosition = Math.floor(Math.random() * (maxGapPosition - minGapPosition) ) + minGapPosition
            let tmpPipe= {
                pipelocation,
                pipeGapHeight,
                pipeGapPosition
            };

            if(!pipelocation || !pipeGapHeight || !pipeGapPosition){
                console.error('error drawing pipe',pipelocation, pipeGapHeight, pipeGapPosition)
                return;
            }
            const pipe = new Pipe2D({
                    position:{
                        X: pipelocation,
                        Y: 0
                    },
                    width: 85,
                    gapY: pipeGapPosition /*between gapheight, 640 - gapheight*/,
                    gapHeight: pipeGapHeight,
                    pisition: 'relative',
                    height: 570
            })
            const uuid=generateUUID()
            pipe.name = 'pipe_'+uuid;
            pipe.type = 'Pipe2D';
            pipe.setParentNode(this)
            pipe.initializeChildren()
            pipe.runInits();
            pipe.runReadys();
            tmpPipe.pipe = pipe
            this.pipes.push(tmpPipe);
            plocation += this.properties.pipeDistance
        }
        console.log('pipes', this.pipes)
    }

    _drawPipe(pipe){
        // pipe.runPhysicalProcesses();
        // pipe.runProcesses();

        //pipe.childrenJSON = child.childrenJSON?[...pipe.childrenJSON, ...child.childrenJSON]:pipe.childrenJSON;
        // console.log('pipe', pipe, eval('child.childrenJSON'))
        // pipe.properties = child.properties?{...pipe.properties, ...child.properties}:pipe.properties;
        pipe.runDraws()
        // console.log('pipe drawn', pipelocation, this.pipes)
}

    _draw(delta){

        const cam = this.getParentScene().getChild('defaultCamera')
        const left = cam.properties.position.X - cam.properties.origin.X*cam.properties.viewWidth - this.properties.deadZone.left
        const right = cam.properties.position.X - (cam.properties.origin.X-1)*cam.properties.viewWidth + this.properties.deadZone.right
        let i = Math.max(this.properties.firstPipeLocation, left) // left and right are defining the part of the map that should be drawn and we should start drawing pipes at first pipe location
        // let pipelocation,pipeGapHeight,pipeGapPosition;
        // while(i<right){
        //     pipelocation = i + (this.properties.pipeDistanceVariation>0?Math.floor(Math.random() * this.properties.pipeDistanceVariation * 2) - this.properties.pipeDistanceVariation: 0)
        //     pipeGapHeight = this.properties.pipeGapHeight + (this.properties.pipeGapHeightVariation>0?Math.floor(Math.random() * this.properties.pipeGapHeightVariation * 2) - this.properties.pipeGapHeightVariation:0)
        //     pipeGapPosition = Math.floor(Math.random() * (maxGapPosition - minGapPosition) ) + minGapPosition
        //     this._drawPipe({pipelocation, pipeGapHeight, pipeGapPosition})
        //     i+=this.properties.pipeDistance
        // }
        const filteredPipes = this.pipes.filter((pipe)=>{
            return pipe.pipelocation>=i && pipe.pipelocation<=right
        })
        // console.log('filtered pipes between', i , right, filteredPipes,cam.properties.position,cam.properties.viewWidth,this.properties.deadZone)
        filteredPipes.forEach((pipe)=>{
            this._drawPipe(pipe.pipe)
        });
    }

    _runDraws(){// this is neccesarry to override default rundraw and disable it

    }


}