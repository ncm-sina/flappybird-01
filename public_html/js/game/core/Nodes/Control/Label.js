"use strict";

class Label extends Control{

    constructor(properties, childrenJSON){
        const defaultProperties = {
            font: '16px Arial',
            width: 'auto',
            height: 'auto',
            textAlign: 'center',
            origin:{
                X:0,
                Y:0
            },
            position:{
                X:50,
                Y:50
            },
            Color: 'red',
            visible: false
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)
    }

    _draw(){
        // console.log('Label draw', this.properties)
        if(this.properties.visible){
            const ctx = window.mctx;
            ctx.fillStyle = this.properties.Color
            ctx.textAlign = this.properties.textAlign;
            ctx.font = this.properties.font;
            // console.log('drawing label ',
            //     {
            //         font: ctx.font,
            //         fillStyle: ctx.fillStyle,
            //         text:this.properties.text,
            //         x:this.properties.position.X,
            //         y:this.properties.position.Y
            //     }
            // );
            ctx.fillText(this.properties.text, this.getEffectivePosition().X, this.getEffectivePosition().Y)
        }
    }

    getEffectiveWidth(){
        let effectiveWidth;
        if(this.properties.width.toString().endsWith('%')){
            effectiveWidth = this.getParentNode().getEffectiveWidth() *
                parseFloat(this.properties.width.substring(0,this.properties.width.length-1))/(100*window.ratio)
        }else if(this.properties.width.toString() == 'auto'){
            effectiveWidth = window.mctx.measureText(this.properties.text).width;            
        }else{
            effectiveWidth = this.properties.width
        }
        return effectiveWidth;
    }

    getEffectiveHeight(){
        let effectiveHeight;
        if(this.properties.height.toString().endsWith('%')){
            effectiveHeight = this.getParentNode().getEffectiveHeight() *
                parseFloat(this.properties.height.substring(0,this.properties.height.length-1))/(100*window.ratio)
            }else if(this.properties.width.toString() == 'auto'){
                const metrics = window.mctx.measureText(this.properties.text);
                let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
                let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;                
                effectiveHeight = actualHeight;
            }else{
                effectiveHeight = this.properties.height
        }
        return effectiveHeight
    }

}