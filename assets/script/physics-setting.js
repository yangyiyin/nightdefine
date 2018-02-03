
var director = cc.director;
let physicsManager = director.getPhysicsManager();
physicsManager.enabled = true;

physicsManager.debugDrawFlags = 0;
    // cc.PhysicsManager.DrawBits.e_aabbBit |
    // cc.PhysicsManager.DrawBits.e_pairBit |
    // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    // cc.PhysicsManager.DrawBits.e_jointBit |
    // cc.PhysicsManager.DrawBits.e_shapeBit
    //;
//
//
// var manager = cc.director.getCollisionManager();
// manager.enabled = true;
// manager.enabledDebugDraw = true;