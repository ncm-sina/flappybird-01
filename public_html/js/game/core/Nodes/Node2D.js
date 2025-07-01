"use strict";

class Node2D extends CNode{

    constructor(properties, childrenJSON=[]){
        const defaultProperties={}
        properties = {...defaultProperties, ...properties}
        // console.log('node2d:',properties, childrenJSON)
        super(properties, childrenJSON)
    }
}