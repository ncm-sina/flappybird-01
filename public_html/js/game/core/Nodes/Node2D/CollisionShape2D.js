"use strict";

class CollisionShape2D extends Node2D{


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
            width: 0,
            height: 0
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)
    }

    _init(){
        const parentNode = this.getParentNode()
        CollisionObject2D.registerCollision(parentNode, this)
    }

    _draw(){
        // console.log('character body 2d draw (empty)')
        const ctx = window.mctx;
        ctx.fillStyle = 'rgba(100,140,255,0.7)';
        // console.log(
        //     this.getEffectivePosition().X ,
        //     this.getEffectivePosition().Y ,
        //     this.getEffectiveWidth(),
        //     this.getEffectiveHeight()
        // )
        if(window.devMode !=undefined && window.devMode == true){
            ctx.fillRect(
                this.getEffectivePosition().X ,
                this.getEffectivePosition().Y ,
                this.getEffectiveWidth(),
                this.getEffectiveHeight()
            );
        }
    }
}