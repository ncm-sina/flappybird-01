"use strict";

class Camera2D extends CNode{


    constructor(properties, childrenJSON){
        const defaultProperties={
            position:{
                X:240,
                Y:320
            },
            origin:{
                X: 0.5,
                Y: 0.5
            },
            viewWidth: 480,
            viewHeight: 640,
            showCameraRect: true,
            default: false
        }

        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)

    }

    _ready(){
        // console.warn('audiostream ready', this.properties);
        // if(this._isSourceValid()){
        //     this._currentSound.audio.autoplay = false
        //     this._currentSound.audio.muted = this.properties.muted
        //     this._currentSound.audio.loop = this.properties.loop
        //     // if(this.properties.autoplay){
        //     //     // console.log('should play')
        //     //     this.shouldPlay = true;
        //     // } else{
        //     //     // console.log('should pause')
        //     //     this.shouldPause = true;
        //     // }            
        // }
    }

    _physicalProcess(){
        // console.error('running physicl process', this)
        // if(!window.app.getOption('isMuted')){
        //     // console.log('ggggggggggg', this.shouldPlay)
        //     if(this.properties.loop || this.shouldPlay){
        //         if(this.isPaused()){
        //             this.play()
        //         }
        //     }
        // }else{
        //     // console.log('fff')
        //     if(!this.isPaused()){
        //         this.pause();
        //     }
        // }
    }

}