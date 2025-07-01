"use strict";

class ImageNumber extends Control{

    constructor(properties, childrenJSON){
        const defaultProperties = {
            sprites:{
                '0': window.app.loader.getSprite('zero'),
                '1': window.app.loader.getSprite('one'),
                '2': window.app.loader.getSprite('two'),
                '3': window.app.loader.getSprite('three'),
                '4': window.app.loader.getSprite('four'),
                '5': window.app.loader.getSprite('five'),
                '6': window.app.loader.getSprite('six'),
                '7': window.app.loader.getSprite('seven'),
                '8': window.app.loader.getSprite('eight'),
                '9': window.app.loader.getSprite('nine'),
            },
            textAlign: 'center',
            spacing: 2,
            origin:{
                X:0,
                Y:0
            },
            position:{
                X:0,
                Y:0
            },
            value: 0,
            visible: true
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)
    }

    _draw_image(numStr, last_x){
        const ctx = window.mctx;
        const img = this.properties.sprites[numStr].img;
        const [imgw, imgh] = [img.naturalWidth, img.naturalHeight];
        const viewScale = window.ratio
        const imageScale = viewScale * this.properties.scale;
        ctx.drawImage(img,
            0,
            0,
            imgw,
            imgh,
            this.getEffectivePosition().X + last_x,
            this.getEffectivePosition().Y ,
            imgw * imageScale,
            imgh * imageScale
        )
        last_x += imgw * imageScale + this.properties.spacing;
        return last_x;
    }

    _draw(){
        // console.log('Label draw', this.properties)
        if(this.properties.visible){
            const valStr = this.properties.value.toString()
            let i;
            let last_x=0;
            for(i=0; i<valStr.length; i++){
                last_x = this._draw_image(valStr[i], last_x)
            }            
        }
    }

    getEffectiveWidth(){
        let effectiveWidth = 0;
        // console.log('calculating imagenum effective width', this)
        const valStr = this.properties.value.toString()
        const viewScale = window.ratio
        const imageScale = viewScale * this.properties.scale;
        for(let i=0; i<valStr.length; i++){
            effectiveWidth += (this.properties.sprites[valStr[i]].img.naturalWidth + this.properties.spacing) * imageScale;
        }
        // console.log('image number effective width:' + effectiveWidth);
        return effectiveWidth;
    }

    getEffectiveHeight(){
        let effectiveHeight = 20;

        return effectiveHeight
    }

}