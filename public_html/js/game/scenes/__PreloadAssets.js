"use strict";

class __PreloadAssets extends Scene{

    totalAudio=1;
    totalSprites=1;
    audioLoaded=0;
    spritesLoaded=0;
    audioLoadStatus = null
    spritesLoadStatus = null

    childrenJSON = [
        {
            type: "ColorRect",
            name: "backgroundRect",
            properties: {
                Color: window.app.options.backgroundColor                
            },
            childrenJSON: [
                {
                    type: 'Container',
                    properties: {
                        origin:{
                            X:0.5,
                            Y:0.5
                        },
                        position:{
                            X:240,
                            Y:220
                        },
                        width: 300,
                        height: 200,
                        Color:'rgba(100,0,0,0.5)'
                    },
                    childrenJSON: [
                        {
                            type: "Label",
                            name: "label",
                            properties: {
                                text: 'Loading',
                                origin:{
                                    X: 0,
                                    Y: -0.5
                                },
                                width: 'auto',
                                height: 'auto',
                                position:{
                                    X: 145,
                                    Y: 180
                                },
                                Color: 'white'
                            },
                            childrenJSON: []
                        },
                        {
                            type: "LoadingBar",
                            name: "loadingBar",
                            properties: {

                            },
                            childrenJSON: []
                        }
                    ]                            
                }
            ]
        }
    ]

    constructor(name){
        const properties = {

        }
        super(properties);
        this.name = name
        // this.childrenJSON = [...this._defaultChildrenJSON, ... this.childrenJSON]
 
        this.loadingProgressHandler = this.loadingProgressHandler.bind(this);
    }

    _ready(){
        App.setState(App.STATES.LOADING_SCREEN)
        window.app.loader.subscribe(this.loadingProgressHandler);
        window.app.loader.load(); 
    }

    loadingProgressHandler(data){
        if(data.resourceType){
            if(data.resourceType == 'sprites'){
                this.spritesLoaded = data.loaded;
                this.totalSprites = data.total;
                this.spritesLoadStatus = data.status;
            }else if(data.resourceType == 'audio'){
                this.audioLoaded = data.loaded
                this.totalAudio = data.total
                this.audioLoadStatus = data.status;
            }
        }
        // console.clear()
        const loadingBar = this.getChild('loadingBar');
        loadingBar.properties.value = this.spritesLoaded + this.audioLoaded;
        loadingBar.properties.maxValue = this.totalSprites+this.totalAudio;
        if(this.spritesLoadStatus == 'finished' && this.audioLoadStatus == 'finished'){
            console.log('loading finished', window.app);
            window.app.loadScene(window.app.props.__startingSceneName);
        }
    }


}