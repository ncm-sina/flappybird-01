"use strict";

class SoundPlayer extends CNode{

    // shouldPlay=false;
    // shouldPause=false;
    _currentSound = null


    constructor(properties, childrenJSON){
        const defaultProperties={
            soundList:{},
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

        this._isSoundValid = this._isSoundValid.bind(this)
        this._isSourceValid = this._isSourceValid.bind(this)
        this._isCurrentlyPlaying = this._isCurrentlyPlaying.bind(this)
    }

    _isSourceValid(soundName = null){
        const ret = this._isSoundValid(soundName) && this._currentSound != undefined && this._currentSound != null && this._currentSound.audio != undefined && this._currentSound.audio != null

        // if(ret)
        //     console.log('source valid', this, this._currentSound)
        // else
        //     console.log('source invalid', this)
        return ret
    }

    _isSoundValid(soundName = null){
        const ret = soundName && (soundName == '_any') || (this.properties.soundList && soundName in this.properties.soundList)
        // console.log('isSoundvalid', ret, soundName, this.properties.soundList, soundName in this.properties.soundList)
        return ret
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

    isPaused(){
        return this._currentSound.audio.paused
    }

    _isCurrentlyPlaying(soundName){
        let ret = true;
        if(soundName != '_any'){
            ret = this._currentSound && soundName == this._currentSound.name
        }
        ret = ret && !this.isPaused()
        return ret
    }


    async play(soundName = null){
        // console.log('async play', this._isSoundValid(soundName), !window.app.getOption('isMuted'))
        if(!this._isSoundValid(soundName)){
            return;
        }
        this._currentSound = this.properties.soundList[soundName]
        if(this._isSourceValid(soundName) && !window.app.getOption('isMuted')){
            try{
                // console.log('fffff', this._currentSound, this._currentSound.audio)
                this._currentSound.audio.autoplay = false
                this._currentSound.audio.muted = this.properties.muted
                this._currentSound.audio.loop = this.properties.loop
                if(!this.isPaused()){
                    //this.stop() //disabled due to unknown error causing scene to restart
                }
                await this._currentSound.audio.play()
                // this.shouldPlay = false;    
            }catch(e){
                
                console.error('error', e, this._currentSound, this.properties.soundList[soundName])
            }
            // this.shouldPause = false;
        }
    }

    stop(soundName = null){
        soundName = soundName || '_any'
        console.log('will stop', soundName, this._isSourceValid(soundName), this._isCurrentlyPlaying(soundName), this._isSoundValid(soundName), this._currentSound)
        if(this._isSourceValid(soundName) && this._isCurrentlyPlaying(soundName)){
            this._currentSound.audio.load()
            // this.shouldPlay = false;
            this.pause()
        }
    }

    pause(){
        if(this._isSourceValid()){
            this._currentSound.audio.pause()
            // this.shouldPause = false;
        }
    }

}