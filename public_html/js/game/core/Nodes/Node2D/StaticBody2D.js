"use strict";

class StaticBody2D extends CollisionObject2D{


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
            }
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)
    }

    _draw(){
        // console.log('character body 2d draw (empty)')
        // const ctx = window.mctx;
        // ctx.fillStyle = 'rgba(100,140,255,0.7)';
        // console.log(
        //     this.getEffectivePosition().X ,
        //     this.getEffectivePosition().Y ,
        //     this.getEffectiveWidth(),
        //     this.getEffectiveHeight()
        // )
        // ctx.fillRect(
        //     this.getEffectivePosition().X ,
        //     this.getEffectivePosition().Y ,
        //     this.getEffectiveWidth(),
        //     this.getEffectiveHeight()
        // );
    }
}