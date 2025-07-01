"use strict";

class Scene extends Node2D{

    childrenJSON=[]
    // _defaultChildrenJSON = [
    // ]
    
    __inits = []
    __readys = []
    __processes = []
    __physicsProcesses = []
    __draws = []
    
    constructor(properties, childrenJSON){
        const defaultProperties={
            width: '100vw', //window.app.options.width,
            height: '100vh', //window.app.options.height,
            position:{
                X:0,
                Y:0
            }
        }

        // const _defaultChildrenJSON = [
        //     {
        //         type: 'Camera2D',
        //         name: 'defaultCamera',
        //         properties:{
        //             position:{
        //                 X:240,
        //                 Y:320
        //             },
        //             origin:{
        //                 X: 0.5,
        //                 Y: 0.5
        //             },
        //             viewWidth: 480,
        //             viewHeight: 640,
        //             showCameraRect: true,
        //             default: true
        //         },
        //         childrenJSON:[]
        //     }
        // ]
    
        
        if(!Array.isArray(childrenJSON)){
            childrenJSON = []
        }

        properties = {...defaultProperties, ...properties}
        // console.log('scene:',properties, [..._defaultChildrenJSON, ...childrenJSON])
        super(properties, childrenJSON)

        // console.log('fpp', properties, this.properties)
        // this.getInits = this.getInits.bind(this)
        // this.getReadys = this.getReadys.bind(this)
        // this.getPhysicsProcesses = this.getPhysicsProcesses.bind(this)
        // this.getProcesses = this.getProcesses.bind(this)
        // this.getDraws = this.getDraws.bind(this)
        this.load = this.load.bind(this);
        this.unload = this.unload.bind(this);
        this.process_loop = this.process_loop.bind(this)
    }

    load(){
        this.initializeChildren();
        this.runInits();
        // console.log('children of scene: ' + this.name, this.children);
        // this.getInits().forEach(fn => {
        //     fn()
        // });
    }

    unload(){
        clearInterval(window.tm1)
        this._setIsRunning(false);
        console.warn('scene ' + this.name + ' stopped running')
    }

    run(){
        this._setIsRunning(true);
        console.log('scene ' + this.name + ' is going to run')
        this.runReadys();
        // this.getReadys().forEach(fn => {
        //     fn()
        // });
        this.loop();
        console.log('scene ' + this.name + ' is now running')
    }

    loop(){
        const pdelta = 1000/window.app.options.physicsFPS;
        console.log('is looping', pdelta)
        window.tm1 = setInterval(() => {
            // console.log('e2', window.last_time);
            let delta2 = 0;
            if(window.last_time2 == null || window.last_time2 == undefined || window.last_time2== -1){
                if(window.last_time == null || window.last_time == undefined || window.last_time == -1)
                    return false;
                window.last_time2 = window.last_time
            }else{
                const tmpdelta = window.last_time-window.last_time2
                if(tmpdelta>0 || tmpdelta<1000)
                    delta2=tmpdelta
                window.last_time2 = window.last_time
            }
            // console.log('running physics process delta:' + delta2 + ' fps:' + 1000/delta2 + ' pdelta:' + pdelta)
            if(!this.isRunning()){
                console.log('is not running')
                clearInterval(window.tm1); 
            }else{
                // console.log('is running')
            }
            this.runPhysicalProcesses(pdelta/1000);
            // this.getPhysicsProcesses().forEach(fn => {
            //     fn();
            // });
        }, pdelta);

        this.process_loop();
    }

    process_loop(e){
        // console.log('process loop', this)
        let delta = 0;
        if(window.last_time2 == null || window.last_time2 == undefined || window.last_time2== -1){
            window.last_time = e
        }else{
            const tmpdelta = e-window.last_time
            if(tmpdelta>0 || tmpdelta<1000)
                delta=tmpdelta
            window.last_time = e
        }
    // console.log('running animation loop delta:' + delta + ' fps:'+1000/delta);
        this.runProcesses(delta);
        this.runDraws(delta);
        // this.getProcesses().forEach(fn => {
        //     fn();
        // });
        // this.getDraws().forEach(fn => {
        //     fn();
        // });
        if(this.isRunning()){
            // console.log('is running')
            requestAnimationFrame(this.process_loop);
        }else{
            console.log('is not running 2')
        }
    }

    getEffectiveWidth(positionMode){
        // console.log('getting effective width of:', this);
        let effectiveWidth;
        if(this.properties.width.toString().endsWith('vw')){
            effectiveWidth = window.app.options.width * parseFloat(this.properties.width.substring(0,this.properties.width.length-2))/(100)
        } else if(this.properties.width.toString().endsWith('vh')){
            effectiveWidth = window.app.options.height * parseFloat(this.properties.width.substring(0,this.properties.width.length-2))/(100)
        }else{
            // console.log('cur width:', this.properties.width.toString())
            effectiveWidth = parseInt(this.properties.width * 1 /*window.ratio*/)
        }
        // console.log('scene effective width:', effectiveWidth)
        return effectiveWidth;
    }
    
    getEffectiveHeight(positionMode){
        // console.log('getting effective heigh of:', this);
        let effectiveHeight;
        if(this.properties.height.toString().endsWith('vw')){
            effectiveHeight = window.app.options.width * parseFloat(this.properties.height.substring(0,this.properties.height.length-2))/(100)
        } else if(this.properties.height.toString().endsWith('vh')){
            effectiveHeight = window.app.options.height * parseFloat(this.properties.height.substring(0,this.properties.height.length-2))/(100)
        }else{
            // console.log('cur height:', this.properties.height.toString())
            effectiveHeight = parseInt(this.properties.height * 1 /*window.ratio*/)
        }
        // console.log('scene effective height:', effectiveHeight)
        return effectiveHeight
    }

    getEffectivePosition(positionMode='relative'){
        let effectivePosition;
        effectivePosition = {...this.properties.position};
        // effectivePosition.X /= 1 //(window.ratio?window.ratio:1)
        // effectivePosition.Y /= 1 //(window.ratio?window.ratio:1)
        const [effectiveWidth, effectiveHeight] = [this.getEffectiveWidth(positionMode), this.getEffectiveHeight(positionMode)]
        if(this.properties.origin){
            // console.log('has origin', this, this.properties.origin, effectivePosition, effectiveWidth, effectiveHeight)
            if(effectiveWidth>0)
                effectivePosition.X -= this.properties.origin.X * effectiveWidth

            if(effectiveHeight>0)
                effectivePosition.Y -= this.properties.origin.Y * effectiveHeight

            // console.log('effective position after origin apply', effectivePosition)
        }else{
            // console.log('no origin', this, this.properties.origin)
        }
        // console.log('getting effective position of', this, 'normal position:', effectivePosition)
        if(positionMode == 'relative'){
            const cam = this.getChild('defaultCamera');
            if(cam != undefined && cam != null){
                // console.warn('ffff')
                if(cam.properties.origin){
                    // console.warn('ffff2 has origin', cam, cam.properties)
                    if(cam.properties.viewWidth){
                        effectivePosition.X += cam.properties.origin.X * cam.properties.viewWidth
                    }            
                    if(cam.properties.viewHeight){
                        effectivePosition.Y += cam.properties.origin.Y * cam.properties.viewHeight
                    }            
                }
                effectivePosition.X -= cam.properties.position.X
                effectivePosition.Y -= cam.properties.position.Y
            }
        }
        // console.log('final efpos:', effectivePosition, this)
        return effectivePosition;
    }


    // getInits(){
    //     return this.__inits;
    // }

    // getReadys(){
    //     return this.__readys;
    // }

    // getProcesses(){
    //     return this.__processes;
    // }

    // getPhysicsProcesses(){
    //     return this.__physicsProcesses;
    // }

    // getDraws(){
    //     return this.__draws;
    // }

    _init(){
        
    }

    _ready(){

    }

    _physicalProcess(){

    }

    _process(){

    }

    _draw(){
        // console.log('scene draw', this);
        window.mctx.clearRect(0, 0, window.canv.width, window.canv.height);
    }

}