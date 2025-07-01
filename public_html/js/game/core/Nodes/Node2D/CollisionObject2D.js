"use strict";

class CollisionObject2D extends Node2D{

    static COLLISION_TYPES = {
        NO_COLLISION: 0,
        COLLISION_STATIC: 1, // when our object is colliding with a staticcollision like a wall
        COLLISION_AREA: 2, // when colliding with an area without an actual object. used for detecting passing through an area
        COLLISION_BOUNCE: 3, // when 2 objects colliding can move so they bounce after colliding
    }

    static _collisionObjects = {}

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
            }
        }
        properties = {...defaultProperties, ...properties}
        super(properties, childrenJSON)
    }

    _draw(){
        // console.log('character body 2d draw (empty)')
    }

    static detectCollisions(collisionObject){
        let collisionShapes = collisionObject.getCollisionShapes()
        let collisionResults = null;
        if(
            collisionShapes == undefined ||
            collisionShapes == null  ||
            !Array.isArray(collisionShapes) ||
            collisionShapes.length<=0
        ){
            return null;
        }
        for (const collisionObject2 of Object.keys(CollisionObject2D._collisionObjects)){
            if(collisionObject.uuid == CollisionObject2D._collisionObjects[collisionObject2].uuid){ // an object always collides with itself so we skip it
                continue;
            }
            let collisionShapes2 = CollisionObject2D._collisionObjects[collisionObject2].getCollisionShapes();
            // console.log('colobj2', CollisionObject2D._collisionObjects[collisionObject2],collisionShapes2)
            if(
                collisionShapes2 == undefined ||
                collisionShapes2 == null  ||
                !Array.isArray(collisionShapes2) ||
                collisionShapes2.length<=0
            ){
                continue;
            }
            if(CollisionObject2D._collisionObjects[collisionObject2] instanceof Area2D){
                // console.log(CollisionObject2D._collisionObjects[collisionObject2], 'Area2D',collisionShapes2)
                collisionShapes2[0].collisionType = CollisionObject2D.COLLISION_TYPES.COLLISION_AREA
            }else if(CollisionObject2D._collisionObjects[collisionObject2] instanceof StaticBody2D){
                // console.log(CollisionObject2D._collisionObjects[collisionObject2], 'StaticBody2D',collisionShapes2)
                collisionShapes2[0].collisionType = CollisionObject2D.COLLISION_TYPES.COLLISION_STATIC
            }else{
                console.error(collisionObject2,collisionShapes2);
            }
            // console.log('colsh 2', collisionShapes2)
            collisionResults = CollisionObject2D._detectCollision(collisionShapes[0],collisionShapes2[0])
            if(collisionResults != undefined && collisionResults != null){
                break;
            }
        }
        return collisionResults;
    }

    static _detectCollision(collisionShape1, collisionShape2){
        let collisionResult = null;
        // console.log('col shape 2, collisionobjects', collisionShape2, CollisionObject2D._collisionObjects)
        if(
            collisionShape1.getEffectivePosition().X + collisionShape1.getEffectiveWidth() 
            > collisionShape2.getEffectivePosition().X &&
            collisionShape2.getEffectivePosition().X + collisionShape2.getEffectiveWidth() 
            > collisionShape1.getEffectivePosition().X &&
            collisionShape1.getEffectivePosition().Y + collisionShape1.getEffectiveHeight()
            > collisionShape2.getEffectivePosition().Y &&
            collisionShape2.getEffectivePosition().Y + collisionShape2.getEffectiveHeight() 
            > collisionShape1.getEffectivePosition().Y
        ){
            if(collisionShape2.collisionType == CollisionObject2D.COLLISION_TYPES.COLLISION_STATIC){
                collisionResult={velocity:{X:0, Y: 0}}
                // console.log('colres 1111', collisionResult)
            }else if(collisionShape2.collisionType == CollisionObject2D.COLLISION_TYPES.COLLISION_AREA){
                collisionResult={}
                // console.log('colres 2222', collisionResult)
            }else{
                console.error('colres 3', collisionShape2, collisionShape2.collisionType)
            }
        }
        return collisionResult
    }

    static registerCollision(collision){
        let uuid = generateUUID();
        collision.uuid = uuid;
        // console.log('registering collision', collision)
        CollisionObject2D._collisionObjects[uuid] = collision
        return uuid;
    }

    static flushCollisions(){
        CollisionObject2D._collisionObjects = {}
    }

    getCollisionShapes(){
        const ret = this.getChildrenByType('CollisionShape2D')
        // console.log('ret', this, ret)
        return ret
    }

}