"use strict";

class CharacterBody2D extends CollisionObject2D{

    _hasCollision = false
    _collisionShapes = []

    constructor(properties, childrenJSON){
        const defaultProperties={
            origin:{
                X:0,
                Y:0
            },
            position:{
                X:0,
                Y:0
            },
            offset:{
                X:0,
                Y:0
            },
            velocity:{
                X: 0,
                Y: 0
            },
            force:{
                X: 0,
                Y: 0
            },
            mass: 1,
            hasPhysics: false,
            doesBounce: false,
            jumpSpeed: -0.45,
            
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)

        this.handleCollision = this.handleCollision.bind(this)
        this.getCollisionShapes = this.getCollisionShapes.bind(this)
    }

    _init(){
        const collisionShapes = this.getCollisionShapes();
        if(collisionShapes !=undefined && collisionShapes !=null){
            this._hasCollision = true
            this._collisionShapes = collisionShapes
        }else{
            this._hasCollision = false
            this._collisionShapes = []
        }
        console.log('hascolision', this._hasCollision, collisionShapes)
    }

    _draw(){
        // console.log('character body 2d draw (empty)')
        // const ctx = window.mctx;
    }
}