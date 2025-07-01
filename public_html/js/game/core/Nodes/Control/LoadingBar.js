"use strict";

class LoadingBar extends Control{
    
    constructor(properties, childrenJSON){
        const defaultProperties = {
            width: '100%',
            height: 20,
            origin:{
                X:0,
                Y:0
            },
            position:{
                X:0,
                Y:210
            },
            FillColor: 'white',
            bgColor: '#102030',
            borderColor: 'white',
            value: 0,
            maxValue: 1
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)
    }

    _draw(){
        const ctx = window.mctx;
        const [dx, dy] = [0.5, 0.5]
        ctx.fillStyle = this.properties.bgColor?this.properties.bgColor: null;
        ctx.translate(dx, dy);
        ctx.fillRect(
            this.getEffectivePosition().X ,
            this.getEffectivePosition().Y ,
            this.getEffectiveWidth(),
            this.getEffectiveHeight()
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.properties.borderColor ? this.properties.borderColor : null;
        ctx.strokeRect(
            this.getEffectivePosition().X ,
            this.getEffectivePosition().Y ,
            this.getEffectiveWidth(),
            this.getEffectiveHeight()
        );
        ctx.fillStyle = this.properties.FillColor?this.properties.FillColor: null;
        ctx.fillRect(
            this.getEffectivePosition().X + 2.5 ,
            this.getEffectivePosition().Y + 2.5 ,
            parseInt(this.getEffectiveWidth() -5) * this.properties.value / this.properties.maxValue ,
            this.getEffectiveHeight() -5
        );
        ctx.translate(-dx, -dy);
    }
}