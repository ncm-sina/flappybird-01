"use strict";

class Control extends CNode{

    constructor(properties, childrenJSON){
        const defaultProperties={}
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)
    }
}