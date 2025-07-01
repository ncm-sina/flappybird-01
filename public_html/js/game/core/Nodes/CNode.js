"use strict";

class CNode{

    name=''
    children=[]
    childrenJSON=[]
    properties={}
    _parentNode = null;
    _isRunning = false

    constructor(properties, childrenJSON=[]){
        const defaultProperties={
            positionMode: 'relative'
        }
        this.properties = {...defaultProperties, ...properties}
        this.childrenJSON = [...this.childrenJSON, ...childrenJSON]
        // console.log('cnode constructor for ', this, childrenJSON, this.childrenJSON);

        // console.log('2cnode constructor for ', this.properties);


        this.runInits               = this.runInits.bind(this)
        this.runReadys              = this.runReadys.bind(this)
        this.runPhysicalProcesses   = this.runPhysicalProcesses.bind(this)
        this.runProcesses           = this.runProcesses.bind(this)
        this.runDraws               = this.runDraws.bind(this)
        this.getParentNode          = this.getParentNode.bind(this)
        this.hasParentNode          = this.hasParentNode.bind(this)
        this.setParentNode          = this.setParentNode.bind(this)
        this.getEffectiveWidth      = this.getEffectiveWidth.bind(this)
        this.getEffectiveHeight     = this.getEffectiveHeight.bind(this)
        this.getEffectivePosition   = this.getEffectivePosition.bind(this)
        this.getChild               = this.getChild.bind(this);
        this.isRunning              = this.isRunning.bind(this);
        this._setIsRunning          = this._setIsRunning.bind(this);

        this._init = this._init.bind(this)
        this._ready = this._ready.bind(this)
        this._physicalProcess = this._physicalProcess.bind(this)
        this._process = this._process.bind(this)
        this._ready = this._ready.bind(this)
        this._draw = this._draw.bind(this)
        this.getParentScene = this.getParentScene.bind(this)

    }

    isRunning(){
        return this._isRunning
    }

    _setIsRunning(value){
        this._isRunning = !!value;
    }

    _init(){
        
    }

    _ready(){

    }
    
    _physicalProcess(pdelta){

    }

    _process(){

    }
    
    _draw(){
        // console.error('Node draw this should not be called! '+ this.name)
    }

    getChild(name){
        let retObj = null;
        if(this.children == undefined || this.children == null )
            return retObj;
        for(const child of this.children){
            if(child && child.name == name){
                retObj = child
                break;
            }
            else{
                retObj = child.getChild(name)
                if(retObj != undefined && retObj != null)
                    break;
            }
        }
        // this.children.forEach( child => {
        //     if(child.name == name){
        //         retObj = child;
        //         return;
        //     }
        //     retObj = child.getChild(name)
        //     if(retObj !=null && retObj != undefined)
        //         return;
        // })
        // console.log('getchild("' + name + '")=', retObj)
        return retObj;
    }

    getChildrenByType(type){
        let retArray = [];
        // console.log('getchildbytype', this.children, type)
        for(const child of this.children){
            // console.log('child', child)
            if(child!=undefined && child!=null){
                if(child.type == type){
                    retArray = [...retArray, child];
                }
                if(Array.isArray(child.children)){
                    retArray = [...retArray, ...child.getChildrenByType(type)]
                }
            } 
        }
        return retArray
    }

    getParentScene(){
        return window.app.getCurrentScene()
    }

    getParentNode(){
        return this._parentNode;
    }

    hasParentNode(){
        return this._parentNode !=null && this._parentNode != undefined && ((typeof this._parentNode) == 'function' || (typeof this._parentNode) == 'object')
    }

    setParentNode(parent){
        this._parentNode = parent;
    }

    getEffectiveWidth(positionMode=null){
        if(positionMode==null)
            positionMode = this.properties.positionMode
        // console.log('getting effective width of:', this);
        let effectiveWidth;
        if(this.properties.width == undefined || this.properties.width== null || this.properties.width==-1 || this.properties.width.toString()=='auto'){
            // console.log('-1')
            // console.log('calcwidh:', this.calculateWidth)
            if(typeof this.calculateWidth != 'undefined'){
                effectiveWidth = this.calculateWidth(positionMode)
            }
            else
                effectiveWidth= -1;
        }else if(this.properties.width.toString().endsWith('%')){
            // console.log('cur width %:', this.properties.width.toString())
            effectiveWidth = this.getParentNode().getEffectiveWidth(positionMode) *
                parseFloat(this.properties.width.substring(0,this.properties.width.length-1))/(100)
        } else if(this.properties.width.toString().endsWith('vw')){
            effectiveWidth = window.app.options.width * parseFloat(this.properties.width.substring(0,this.properties.width.length-2))/(100)
        } else if(this.properties.width.toString().endsWith('vh')){
            effectiveWidth = window.app.options.height * parseFloat(this.properties.width.substring(0,this.properties.width.length-2))/(100)
        }else{
            // console.log('cur width:', this.properties.width.toString())
            effectiveWidth = parseInt(this.properties.width * 1 /*window.ratio*/)
        }
        // console.log('effective width:', effectiveWidth)
        return effectiveWidth;
    }
    
    getEffectiveHeight(positionMode=null){
        if(positionMode==null)
            positionMode = this.properties.positionMode
        // console.log('getting effective heigh of:', this);
        let effectiveHeight;
        if(this.properties.height == undefined || this.properties.height== null || this.properties.height==-1 || this.properties.height.toString()=='auto'){
            // console.log('-1')
            if(typeof this.calculateHeight != 'undefined')
                effectiveHeight = this.calculateHeight(positionMode)
            else
                effectiveHeight= -1;
        }else if(this.properties.height.toString().endsWith('%')){
            // console.log('cur height %:', this.properties.height.toString())
            effectiveHeight = this.getParentNode().getEffectiveHeight(positionMode) *
                parseFloat(this.properties.height.substring(0,this.properties.height.length-1))/(100)
        } else if(this.properties.height.toString().endsWith('vw')){
            effectiveHeight = window.app.options.width * parseFloat(this.properties.height.substring(0,this.properties.height.length-2))/(100)
        } else if(this.properties.height.toString().endsWith('vh')){
            effectiveHeight = window.app.options.height * parseFloat(this.properties.height.substring(0,this.properties.height.length-2))/(100)
        }else{
            // console.log('cur height:', this.properties.height.toString())
            effectiveHeight = parseInt(this.properties.height * 1 /*window.ratio*/)
        }
        // console.log('effective height:', effectiveHeight)
        return effectiveHeight
    }

    getEffectivePosition(positionMode=null){
        if(positionMode==null)
            positionMode = this.properties.positionMode
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
        if(this.hasParentNode()){
            const parentEffectivePosition = this.getParentNode().getEffectivePosition(positionMode);
            // console.log('parentEffectivepos:', parentEffectivePosition, this.getEffectiveWidth(), this.getEffectiveHeight())
            effectivePosition.X += parentEffectivePosition.X;
            effectivePosition.Y += parentEffectivePosition.Y;
            // console.log('new positionx:',this, effectivePosition.X ,this.properties.origin.X , this.getEffectiveWidth())
            // console.log('new positiony:',this, effectivePosition.Y ,this.properties.origin.Y , this.getEffectiveHeight())
        }
        // console.log('final efpos:', effectivePosition, this)
        return effectivePosition;
    }
    
    initializeChildren(){
        // console.log('initializingChildren for ',this.childrenJSON)
        if(this.childrenJSON == null || this.childrenJSON == undefined || !Array.isArray(this.childrenJSON)){
            return;
        }
        for(const child of this.childrenJSON){
            if(typeof eval(child.type) == 'function'){
                const obj = eval('new ' + child.type + '( child.properties, child.childrenJSON )');
                // console.log('new ' + child.type + '( child.properties, child.childrenJSON )', child)
                obj.name = child.name ? child.name : null;
                obj.type = child.type ? child.type : null;
                obj.setParentNode(this)
                //obj.childrenJSON = child.childrenJSON?[...obj.childrenJSON, ...child.childrenJSON]:obj.childrenJSON;
                // console.log('obj', obj, eval('child.childrenJSON'))
                // obj.properties = child.properties?{...obj.properties, ...child.properties}:obj.properties;
                obj.initializeChildren()
                // console.log('obbj', obj)
                this.children.push(obj)
            }
        }
    }

    runInits(){
        // if(this.hasOwnProperty('_init')){
            this._init()
        // }else{
        //     // console.error('not running init', this)
        // }
        this.children.forEach(child =>{
            if(typeof child.runInits == 'function')
                child.runInits();
        })
    }

    runReadys(){
        // if(this.hasOwnProperty('_ready')){
            this._ready()
        // }else{
        //     // console.error('not running ready', this)
        // }

        this.children.forEach(child =>{
            if(typeof child.runReadys == 'function')
                child.runReadys();
        })
    }

    runPhysicalProcesses(pdelta){
        // if(!this.isRunning){
        //     console.error('should not be running physical process', this)
        // }
        // console.log('running phsycial proceeses', this)
        // if(this.hasOwnProperty('_physicalProcess')){
            // console.log('running physical processes', this)
            this._physicalProcess(pdelta)
        // }else{
        //     // console.error('not running physicalprocess', this)
        // }
        this.children.forEach(child =>{
            if(typeof child.runPhysicalProcesses == 'function')
                child.runPhysicalProcesses(pdelta);
        })
    }

    runProcesses(delta){
        // console.log('running proceeses', this)
        // if(this.hasOwnProperty('_process')){
            this._process(delta);
        // }else{
        //     // console.error('not running process', this)
        // }
        this.children.forEach(child =>{
            if(typeof child.runProcesses == 'function')
                child.runProcesses(delta);
        })
    }

    runDraws(){
        // console.log('running draws on node: '+ this.name,this.properties, this.children)
                
        // if(Object.getPrototypeOf(this).hasOwnProperty('_draw')){
            this._draw();
        // }else{
        //     console.error('not running draw', this)
        // }
        this.children.forEach(child =>{
            if(typeof child.runDraws == 'function')
                child.runDraws();
        })
    }

}