"use strict";

class BoxContainer extends Control{


    constructor(properties, childrenJSON){
        const defaultProperties={
            position: {X:0, Y:0}, //Vector2D(0,0),
            origin: {X:0, Y:0}, //Vector2D(0,0),
            width: '100%',
            height: '100%',
            bgColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)',
            borderRadius: 0,
            borderWidth: 3,
            visible: false
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)        
    }

    _draw(){
        const [dx, dy] = [0.5, 0.5]
        const ctx = window.mctx;
        if(this.properties.visible){
            ctx.beginPath()
            ctx.translate(dx, dy);
            ctx.strokeStyle = this.properties.borderColor;
            ctx.fillStyle = this.properties.bgColor;       
            ctx.lineWidth = this.properties.borderWidth
            ctx.roundRect(
                this.getEffectivePosition().X ,
                this.getEffectivePosition().Y ,
                this.getEffectiveWidth(),
                this.getEffectiveHeight(),
                this.properties.borderRadius
            );
            ctx.stroke();
            ctx.fill();        
            ctx.translate(-dx, -dy);
        }
    }
    
}