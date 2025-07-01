"use strict";

class AnimatedSprite2D extends Node2D{

    
    constructor(properties){
        const defaultProperties={
            origin:{
                X:0,
                Y:0
            },
            position:{
                X:0,
                Y:0
            },
            width:'100%',
            height: '100%',
            animations:{
                'animation1':{
                    speed: 30,
                    frames:{
                        
                    }
                }
            }
        }
        properties = {...defaultProperties, ...properties}
        super(properties)
    }

    _draw(){
        const ctx = window.mctx;
        // console.log('draw animatedsprite2d');
    }
}