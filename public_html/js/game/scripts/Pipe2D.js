"use strict";

class Pipe2D extends Node2D{

    childrenJSON=[
        {
            type: 'StaticBody2D',
            name: 'upperPartStaticBody',
            properties:{

            }
            ,childrenJSON:[
                {
                    type: 'Sprite2D',
                    name: 'upperPartSprite',
                    properties:{
                        sprite: window.app.loader.getSprite('pipe-green-reversed'),
                        scaleMode: 'stretch',
                        width: '100%',
                        origin:{
                            X: 0.5,
                            Y: 0
                        },
                        position:{
                            X:0,
                            Y:0
                        },
                        offset:{
                            X: 0,
                            Y: 0
                        },
                    }
                },
                {
                    type: 'CollisionShape2D',
                    name: 'upperPartCollision',
                    properties: {
                        position:{
                            X:0,
                            Y:0
                        },
                        origin:{
                            X:0.5,
                            Y:0
                        },
                        offset:{
                            X: 0,
                            Y: 0
                        },
                        width: '100%',
                        height: 40
                    },
                    childrenJSON: []
                },
            ]
        },
        {
            type: 'Area2D',
            name: 'passThroughArea2D',
            properties:{

            }
            ,childrenJSON:[
                {
                    type: 'CollisionShape2D',
                    name: 'passThroughCollision',
                    properties: {
                        position:{
                            X:0,
                            Y:0
                        },
                        origin:{
                            X:0.5,
                            Y:0
                        },
                        offset:{
                            X: 0,
                            Y: 0
                        },
                        width: '100%',
                        height: 40
                    },
                    childrenJSON: []
                },
            ]
        },
        {
            type: 'StaticBody2D',
            name: 'lowerPartStaticBody',
            properties:{

            }
            ,childrenJSON:[
                {
                    type: 'Sprite2D',
                    name: 'lowerPartSprite',
                    properties:{
                        sprite: window.app.loader.getSprite('pipe-green'),
                        scaleMode: 'stretch',
                        width: '100%',
                        origin:{
                            X: 0.5,
                            Y: 0
                        },
                        position:{
                            X:0,
                            Y:0
                        },
                        offset:{
                            X: 0,
                            Y: 0
                        },
                    }
                },
                {
                    type: 'CollisionShape2D',
                    name: 'lowerPartCollision',
                    properties: {
                        position:{
                            X:0,
                            Y:0
                        },
                        origin:{
                            X:0.5,
                            Y:0
                        },
                        offset:{
                            X: 0,
                            Y: 0
                        },
                        width: '100%',
                        height: 40
                    },
                    childrenJSON: []
                },
            ]
        },
    ]
    
    constructor(properties){
        const defaultProperties={
            position:{
                X:0,
                Y:0
            },
            width: 100,
            height: '100%',
            scale: 1,
            gapHeight: 200,
            gapY:0
        }
        properties = {...defaultProperties, ...properties}
        super(properties)


    }

    _ready(){
        // console.clear()
        const upperPartSprite = this.getChild('upperPartSprite')
        const lowerPartSprite = this.getChild('lowerPartSprite')
        const upperPartCollision = this.getChild('upperPartCollision')
        const lowerPartCollision = this.getChild('lowerPartCollision')
        const passThroughCollision = this.getChild('passThroughCollision')
        // console.warn(upperPart, lowerPart)
        const pipeImageNaturalWidth = 52
        const pipeImageNaturalHeight = 320
        const pipeScreenHeight = this.getEffectiveHeight();
        const pipeImageHeightScale = (pipeImageNaturalHeight/this.getEffectiveHeight())

        upperPartSprite.properties.width = this.properties.width
        upperPartSprite.properties.height = this.properties.gapY - this.properties.gapHeight/2
        upperPartSprite.properties.offset.Y = ( pipeScreenHeight- upperPartSprite.properties.height) * pipeImageHeightScale

        upperPartCollision.properties.width = upperPartSprite.properties.width
        upperPartCollision.properties.height = upperPartSprite.properties.height

        lowerPartSprite.properties.width = this.properties.width
        lowerPartSprite.properties.height = pipeScreenHeight - this.properties.gapY - this.properties.gapHeight/2 
        lowerPartSprite.properties.position.Y = (this.properties.gapY + this.properties.gapHeight/2)
        lowerPartSprite.properties.offset2.Y = ( pipeScreenHeight- lowerPartSprite.properties.height) * pipeImageHeightScale

        lowerPartCollision.properties.width = lowerPartSprite.properties.width
        lowerPartCollision.properties.height = lowerPartSprite.properties.height
        lowerPartCollision.properties.position.Y = lowerPartSprite.properties.position.Y

        passThroughCollision.properties.width = 4
        passThroughCollision.properties.height = this.properties.gapHeight - 40 // vertical offset
        passThroughCollision.properties.position.Y = upperPartSprite.properties.height + 20
        passThroughCollision.properties.position.X = this.properties.width/2 + 20 // 20 is some offset so that we count a pipe as passed if bird actually passes through it
        // console.log('pppppp',
        //      this.properties, passThroughCollision.properties
        // )
    }


}