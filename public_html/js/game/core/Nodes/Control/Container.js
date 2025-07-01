"use strict";

class Container extends Control{



    constructor(properties, childrenJSON){
        const defaultProperties={
            position: {X:1, Y:2}, //Vector2D(0,0),
            origin: {X:0, Y:0}, //Vector2D(0,0),
            width: '100%',
            height: '100%'
        }
        // console.log('Container constructor', properties)
        properties = {...defaultProperties, ...properties}
        // console.log('Container constructor2', properties)
        super(properties, childrenJSON)
        // console.log('Container constructor3', this.properties)
    }

    _draw(){
        // console.log('running color rect draw');
    }
    
}