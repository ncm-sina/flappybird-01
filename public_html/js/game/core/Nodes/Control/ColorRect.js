"use strict";

class ColorRect extends Control{


    constructor(properties, childrenJSON){
        const defaultProperties={
            position: {X:0, Y:0}, //Vector2D(0,0),
            origin: {X:0, Y:0}, //Vector2D(0,0),
            width: '100%',
            height: '100%'
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)        
    }

    _draw(){
        // console.log('running color rect draw',
        //     this.getEffectivePosition().X ,
        //     this.getEffectivePosition().Y ,
        //     this.getEffectiveWidth(),
        //     this.getEffectiveHeight()
        // );
        const ctx = window.mctx;
        ctx.fillStyle = this.properties.Color?this.properties.Color:ctx.fillStyle;
        ctx.fillRect(
            this.getEffectivePosition().X ,
            this.getEffectivePosition().Y ,
            this.getEffectiveWidth(),
            this.getEffectiveHeight()
        );
    }
    
}