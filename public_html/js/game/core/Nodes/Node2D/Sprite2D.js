"use strict";

class Sprite2D extends Node2D{

    
    constructor(properties){
        const defaultProperties={
            origin:{
                X:0 ,
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
            offset2:{
                X:0,
                Y:0
            },
            destinationOffset:{
                X:0,
                Y:0
            },
            repeat: 'no',
            scale: 1, 
            scaleMode:'stretch',
            width:'auto',
            height: 'auto',
            rotation: 0,
            positionMode: 'relative'
        }
        properties = {...defaultProperties, ...properties}
        super(properties)

        this.calculateWidth = this.calculateWidth.bind(this)
        this.calculateHeight = this.calculateHeight.bind(this)
    }

    _draw(){
        // console.log('sprite2D draw', this)
        const ctx = window.mctx;
        const img = this.properties.sprite.img;
        // console.log('gggg img',img.naturalWidth, img.naturalHeight)
        const viewScale = window.ratio
        const imageScale = viewScale * this.properties.scale

        //offsets cannot be larger than the size they are offsetting so we use % (mod) to reset them
        this.properties.offset.X = this.properties.offset.X % img.naturalWidth
        this.properties.offset2.X = this.properties.offset2.X % img.naturalWidth
        this.properties.offset.Y = this.properties.offset.Y % img.naturalHeight
        this.properties.offset2.Y = this.properties.offset2.Y % img.naturalHeight
        this.properties.destinationOffset.X = this.properties.destinationOffset.X % this.properties.width
        this.properties.destinationOffset.Y = this.properties.destinationOffset.X % this.properties.height

        const [imgw, imgh] = [img.naturalWidth - this.properties.offset.X - this.properties.offset2.X,img.naturalHeight - this.properties.offset.Y-this.properties.offset2.Y]
        
        let effectivePosition = this.getEffectivePosition()
        // effectivePosition.X = ;
        // effectivePosition.Y = ;
        // console.log('scale', viewScale, imageScale)
        let [effectiveWidth, effectiveHeight] = [this.getEffectiveWidth(), this.getEffectiveHeight()];
        if(effectiveWidth == -1)
            effectiveWidth = imgw;
        if(effectiveHeight == -1)
            effectiveHeight = imgh;

        // console.log('sprite2D draw', this.properties, [imgw, imgh, effectiveWidth, effectiveHeight, imageScale, effectivePosition])
        if(window.devMode !=undefined && window.devMode == true){
            ctx.fillStyle="red"
            ctx.fillRect(effectivePosition.X, effectivePosition.Y, effectiveWidth, effectiveHeight);
        }

        if(this.properties.scaleMode == 'stretch'){
            // console.log(img,
            //     this.properties.offset.X,
            //     this.properties.offset.Y,
            //     imgw,
            //     imgh,
            //     'X:' + effectivePosition.X ,
            //     'Y:' + effectivePosition.Y ,
            //     'Width:' + effectiveWidth,
            //     'Height:' + effectiveHeight
            // );

            ctx.translate(effectivePosition.X, effectivePosition.Y);
            ctx.rotate(this.properties.rotation);
    
            ctx.drawImage(img,
                this.properties.offset.X,
                this.properties.offset.Y,
                imgw,
                imgh,
                0 ,
                0,
                effectiveWidth,
                effectiveHeight
            )
            ctx.rotate(-this.properties.rotation);
            ctx.translate(-effectivePosition.X, -effectivePosition.Y);
    
        }else if(this.properties.scaleMode == 'fill-w'){
            // console.log('drawing fill-w',
            //     this.properties.offset.X,
            //     this.properties.offset.Y,
            //     imgw,
            //     imgh,
            //     effectivePosition.X,
            //     effectivePosition.Y,
            //     effectiveWidth * imageScale,
            //     Math.floor(effectiveWidth * imageScale *imgh/imgw)
            // )
            ctx.translate(effectivePosition.X, effectivePosition.Y);
            ctx.rotate(this.properties.rotation);

            ctx.drawImage(img,
                this.properties.offset.X,
                this.properties.offset.Y,
                imgw,
                imgh,
                0,
                0,
                effectiveWidth,
                Math.floor(effectiveWidth *imgh/imgw)
            )
            ctx.rotate(-this.properties.rotation);
            ctx.translate(-effectivePosition.X, -effectivePosition.Y);
        }else if(this.properties.scaleMode == 'fill-h'){
            // const img = img;
            // const [imgw, imgh] = [img.naturalWidth,img.naturalHeight]
            ctx.translate(effectivePosition.X, effectivePosition.Y);
            ctx.rotate(this.properties.rotation);
            if(this.properties.repeat == 'x'){
                let x=-this.properties.destinationOffset.X, y=0, offsx=this.properties.offset.X, offsy=this.properties.offset.Y, destW, sourW, attempt=0;
                destW = effectiveHeight*imgw/imgh
                sourW = imgw
                console.log('x:', x, 'width:', this.properties.width)
                do{
                    console.log(
'null'
                    )
                    if(destW+x>this.properties.width){
                        sourW = imgw * (this.properties.width-x)/destW
                        destW = this.properties.width-x
                    }
                    ctx.drawImage(this.properties.sprite.img,
                        this.properties.offset.X,
                        this.properties.offset.Y,
                        sourW,
                        imgh,
                        x,
                        y,
                        destW,
                        effectiveHeight
                    )
                    x += destW
                    destW = effectiveHeight*img.naturalWidth/imgh
                    offsx = 0
                    attempt++
                }while(x<=this.properties.width && attempt <5);
            }else{
                ctx.drawImage(this.properties.sprite.img,
                    this.properties.offset.X,
                    this.properties.offset.Y,
                    imgw,
                    imgh,
                    0,
                    0,
                    effectiveHeight*imgw/imgh,
                    effectiveHeight
                )
            }
            ctx.rotate(-this.properties.rotation);
            ctx.translate(-effectivePosition.X, -effectivePosition.Y);    
        }else if(this.properties.scaleMode == 'original'){
            // console.log('ddd', img,
            //     this.properties.offset.X,
            //     this.properties.offset.Y,
            //     imgw,
            //     imgh,
            //     effectivePosition.X ,
            //     effectivePosition.Y,
            //     imgw,
            //     imgh

            // )
            const [destWidth, destHeight] = [imgw * imageScale,imgh * imageScale]
            const [centerX, centerY] = [effectivePosition.X + destWidth/2, effectivePosition.Y + destHeight/2]
            ctx.translate(centerX, centerY);
            ctx.rotate(this.properties.rotation);

            ctx.drawImage(img,
                this.properties.offset.X,
                this.properties.offset.Y,
                imgw,
                imgh,
                -destWidth/2,
                -destHeight/2,
                destWidth,
                destHeight
            )
            ctx.rotate(-this.properties.rotation);
            ctx.translate(-centerX, -centerY);    
        }
    }

    calculateWidth(){
        const img = this.properties.sprite.img;
        const viewScale = window.ratio
        const imageScale = viewScale * this.properties.scale
        return img.naturalWidth * imageScale
    }

    calculateHeight(){
        const img = this.properties.sprite.img;
        const viewScale = window.ratio
        const imageScale = viewScale * this.properties.scale
        return img.naturalHeight * imageScale
    }
}