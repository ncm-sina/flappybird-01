"use strict";

class AudioStreamPlayer extends CNode{

    shouldPlay=false;
    // shouldPause=false;


    constructor(properties, childrenJSON){
        const defaultProperties={
            source: null,
            loop: false,
            muted: true,
            autoplay: false,
            volume: 1
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)


        this._physicalProcess = this._physicalProcess.bind(this)
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.play = this.play.bind(this);
        this.isPaused = this.isPaused.bind(this)
    }

    _isSourceValid(){
        const ret = this.properties.source != undefined && this.properties.source != null && this.properties.source.audio != undefined && this.properties.source.audio != null
        // if(ret)
        //     console.log('source valid', this, this.properties.source)
        // else
        //     console.log('source invalid', this)
        return ret
    }

    _ready(){
        // console.warn('audiostream ready', this.properties);
        if(this._isSourceValid()){
            this.properties.source.audio.autoplay = this.properties.autoplay
            this.properties.source.audio.muted = this.properties.muted
            this.properties.source.audio.loop = this.properties.loop
            if(this.properties.autoplay){
                // console.log('should play')
                this.shouldPlay = true;
            } else{
                // console.log('should pause')
                this.shouldPause = true;
            }            
        }
    }

    _physicalProcess(){
        // console.error('running physicl process', this)
        if(!window.app.getOption('isMuted')){
            // console.log('ggggggggggg', this.shouldPlay)
            if(this.properties.loop || this.shouldPlay){
                if(this.isPaused()){
                    this.play()
                }
            }
        }else{
            // console.log('fff')
            if(!this.isPaused()){
                this.pause();
            }
        }
    }

    isPaused(){
        return this.properties.source.audio.paused
    }


    async play(){
        if(this._isSourceValid()){
            try{
                await this.properties.source.audio.play()
                this.shouldPlay = false;    
            }catch(e){
                console.error('error', e)
            }
            // this.shouldPause = false;
        }
    }

    stop(){
        if(this._isSourceValid()){
            this.properties.source.audio.load()
            this.shouldPlay = false;
            this.pause()
        }
    }

    pause(){
        if(this._isSourceValid()){
            this.properties.source.audio.pause()
            // this.shouldPause = false;
        }
    }

}