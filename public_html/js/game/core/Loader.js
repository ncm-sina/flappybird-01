"use strict";

const sleep = (ms) =>{
    console.log('sleep '+ms);
    new Promise(r => setTimeout(r, ms));
}


class Loader {

    resourcePath = null;
    resources = {
        sprites: {},
        audio: {},
    };
    totalSprites = -1;
    totalAudio = -1;
    loadedSprites = 0;
    loadedAudio = 0;
    subscribers=[];

    constructor(resourcePath){
        this.resourcePath = resourcePath;
        
        this.handleAudioLoad = this.handleAudioLoad.bind(this);
        this.handleSpriteLoaded = this.handleSpriteLoaded.bind(this);
        this.getAudio = this.getAudio.bind(this)
        this.getSprite = this.getSprite.bind(this)
    }

    subscribe = function(callbackFunction){
        if(!Array.isArray(this.subscribers))
            this.subscribers = [];
        this.subscribers.push(callbackFunction);
    }

    publish = function(data){
      if(!Array.isArray(this.subscribers))
        this.subscribers=[];
      for(const cb of this.subscribers){
        cb(data);
      }
    }

    getSprite(spriteName){
        if(this.resources && this.resources.sprites && spriteName in this.resources.sprites){
            return this.resources.sprites[spriteName];
        }
        return null
    }

    getAudio(audioName){
        if(this.resources && this.resources.audio && audioName in this.resources.audio){
            return this.resources.audio[audioName];
        }
        return null
    }

    handleSpriteLoaded = function(){
        this.loadedSprites += 1;
        if(this.loadedSprites>=this.totalSprites){
            this.publish({
                status: 'finished',
                resourceType: 'sprites',
                total: this.totalSprites,
                loaded: this.totalSprites
            })    
        }else{
            this.publish({
                status: 'loading',
                resourceType: 'sprites',
                total: this.totalSprites,
                loaded: this.loadedSprites
            })
        }
    }

    handleAudioLoad = function(){
        this.loadedAudio += 1;
        if(this.loadedAudio>=this.totalAudio){
            this.publish({
                status: 'finished',
                resourceType: 'audio',
                total: this.totalAudio,
                loaded: this.totalAudio
            })                
        }else{
            this.publish({
                status: 'loading',
                resourceType: 'audio',
                total: this.totalAudio,
                loaded: this.loadedAudio
            })    
        }
    }

    load = function(loadingFinishedCB){
        // this.publish({
        //     status: 'loading',
        //     resourceType: 'sprites',
        //     total: this.totalSprites,
        //     loaded: this.loadedSprites
        // })
        // this.publish({
        //     status: 'loading',
        //     resourceType: 'audio',
        //     total: this.totalAudio,
        //     loaded: this.loadedAudio
        // })
        jQuery.getJSON(this.resourcePath, async (data)=> {
            if(data && data.assets){
                if(data.assets.sprites){
                    for(const msprite of data.assets.sprites){
                        var img = new Image();
                        // await sleep(100);
                        img.onload = this.handleSpriteLoaded;
                        img.src = msprite.src;
                        msprite.img = img;
                        this.addResources( msprite.name?msprite.name:msprite.id, msprite, 'sprite')
                    }
                }
                if(data.assets.audio){
                    for(const maudio of data.assets.audio){
                        var audio = new Audio();
                        $(audio).on('loadeddata', this.handleAudioLoad);
                        //audio.onload = this.handleAudioLoad;
                        audio.src = Array.isArray(maudio.src)?maudio.src[0]:maudio.src;
                        audio.preload = "auto";
                        audio.volume = maudio.volume ? maudio.volume : 1;
                        maudio.audio = audio;
                        this.addResources( maudio.name?maudio.name:maudio.id, maudio, 'audio')
                    }
                }
            }
            if(data && data.Scenes){
                const loadedScenes = {}
                for(const scene of data.Scenes){
                    loadedScenes[scene.name] = scene.src;
                }
                window.App.props.Scenes = loadedScenes;
            }
        });
    }

    addResources = function (key, val, type){
        if(!this.resources){
            this.resources = {
                sprites:{},
                audio:{}
            }
        }
        if( type == 'sprite' ){
            this.resources.sprites[key] = val;
            this.totalSprites = Object.keys(this.resources.sprites).length;
        }else if( type == 'audio'){
            this.resources.audio[key] = val;
            this.totalAudio = Object.keys(this.resources.audio).length;
        }else{
            throw "Unsupported resource type:"+type
        }
        // console.log('addr', this.resources.audio)
    }
}