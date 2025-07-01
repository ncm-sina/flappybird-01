class App{
    props= {
      Scenes: {},
      __startingSceneName: null,
      __currentScene: null,
      resourcePath: ''
    };

    ctx = null
    options = {}
    loader = null

    static STATES = {
        NO_STATE: 0,
        LOADING_SCREEN: 1,
        READY_TO_START: 2,
        PLAYING: 3,
        GAME_OVER: 4,
        ERROR: 5
    }
    static _state = App.STATES.NO_STATE
    static _score = 0;

    static mouseEventSubscribers = []
    static keyboardEventSubscribers = []


    constructor(params){
        if(params){
            this.loader = params.loader ? params.loader : null;
            if(params.props){
                this.props = params.props;
                // this.props.resourcePath = params.props.resourcePath ? params.props.resourcePath : null;
            }
            this.options = params.options ? params.options: {};
            this.ctx = params.ctx ? params.ctx : null;
        }

        this.getOption = this.getOption.bind(this)
        this.setOption = this.setOption.bind(this)

    }

    static setState(state){
        if(typeof state === 'string' || state instanceof String){
            App._state = App.STATES[state]
        }else if(Number.isInteger(state) || Number.isInteger(parseInt(state))){
            App._state = state
        }else{
            throw error('bad state')
        }
    }

    static getState(){
        return App._state
    }

    static setScore(score){
        App._score = score
        if(App.getBestScore() < App._score)
            App.setBestScore(App._score)
    }

    static addScore(points){
        App._score += points
        if(App.getBestScore() < App._score)
            App.setBestScore(App._score)
    }

    static getScore(){
        return App._score;
    }

    static getBestScore(){
        return localStorage.getItem("_bestScore")?localStorage.getItem("_bestScore"):0;
    }

    static setBestScore(score){
        localStorage.setItem("_bestScore", score)
    }

    getOption(name){
        const ret = this.options && this.options[name]!=undefined?this.options[name]:null;
        // console.log('getoption('+name+')='+ret)
        return ret
    }

    setOption(name, value){
        this.options[name] = value;
        // console.log('setoption('+name+')='+value, this.getOption(name))
    }

    getStartingSceneName = function(){
      return this.props.__startingSceneName;
    }

    getCurrentScene = function(){
      if(this.props.__currentScene != null && this.props.__currentScene != undefined)
        return this.props.__currentScene
      return null;
    }

    setCurrentScene = function(sceneName){
        const scene = this.props.Scenes.find((mscene)=> {
            mscene.name == sceneName
        });
        if(scene != null && scene != undefined){
            console.error('Scene: '+ sceneName + ' not found!', this.props.Scenes)
            throw "Scene Not Found";
        }
        if(typeof eval(sceneName) == 'function'){
            const scene = eval('new ' + sceneName + "(sceneName)");
            console.log(scene);
            // scene.name = sceneName;
            this.props.__currentScene = scene;
            return true;
        }
        return false;
    }

    loadScene = function(sceneName){
        console.log('loading Scene: '+ sceneName)
        if(this.getCurrentScene()){
            console.log('first unload current scene:', this.getCurrentScene())
            this.getCurrentScene().unload();
        }
        window.setTimeout(()=>{
            if(this.setCurrentScene(sceneName)){
                console.log('setting cur scene: ' + sceneName)
                this.getCurrentScene().load();
                // this.setCurrentScene(sceneName);
                this.getCurrentScene().run();
            }else{
                console.log('eeee')
            }
        },300)
    }

    __preloadAssets = function(){
    //   const scene = new __PreloadAssets('/resources.json');
    //   scene.init();
        this.loadScene("__PreloadAssets");
    }

    run = async function(){
        const data = await jQuery.getJSON(this.options.resourcePath);
        window.resources = data;
        if(data && data.assets && data.scenes){
            this.props.Scenes = data.scenes;
            // this.loadScene(this.getStartingSceneName());
            console.log('app running');
            this.__preloadAssets();
            console.log('app finished running');
        }else{
            console.log('error loading resources list');
        }
    
/*        jQuery.getJSON(this.props.resourcePath, (data)=> {
            window.resources = data;
            if(data && data.assets && data.scenes){
                this.props.Scenes = data.scenes;
                this.__preloadAssets();
                // this.loadScene(this.getStartingSceneName());
                console.log('app running');
            }else{
                console.log('error loading resources list');
            }
        });*/
    }

    static subscribeKeyboardEvent = function(callbackFunction){
        const uuid = generateUUID();
        if(!Array.isArray(App.keyboardEventSubscribers))
            App.keyboardEventSubscribers = [];

        App.keyboardEventSubscribers.push({uuid, callbackFunction});
        return uuid;
    }

    static publishKeyboardEvent = function(data){
      if(!Array.isArray(App.keyboardEventSubscribers))
        App.keyboardEventSubscribers=[];
      for(const e of App.keyboardEventSubscribers){
        e.callbackFunction(data);
      }
    }

    static unsubscribeKeyboardEvent = function(uuid){
        for(const i in App.keyboardEventSubscribers){
            if(App.keyboardEventSubscribers[i].uuid == uuid)
                App.keyboardEventSubscribers.splice(i, 1)
        }
    }

    static subscribeMouseEvent = function(callbackFunction){
        const uuid = generateUUID();
        if(!Array.isArray(App.mouseEventSubscribers))
            App.mouseEventSubscribers = [];

        App.mouseEventSubscribers.push({uuid, callbackFunction});
        return uuid;
    }

    static unsubscribeMouseEvent = function(uuid){
        for(const i in App.mouseEventSubscribers){
            if(App.mouseEventSubscribers[i].uuid == uuid)
                App.mouseEventSubscribers.splice(i, 1)
        }
    }

    static publishMouseEvent = function(data){
        if(!Array.isArray(App.mouseEventSubscribers))
            App.mouseEventSubscribers=[];
        for(const e of App.mouseEventSubscribers){
            e.callbackFunction(data);
        }
    
    //   if(!Array.isArray(App.mouseEventSubscribers))
    //     App.mouseEventSubscribers=[];
    //   for(const e of App.mouseEventSubscribers){
    //     cb(data);
    //   }
    }

    static getInstance = function(ctx, options){
        const props = {
            Scenes: {},
            __startingSceneName: 'GameScene',
            __currentScene: null,
            resourcePath: '/resources.json'
        }
        const loader = new Loader(props.resourcePath);
        const app = new App({
            loader,
            options,
            ctx,
            props
        });
        return app;
    }
};
