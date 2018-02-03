// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        pool:null,
        bullet:null
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

     },

    start () {

    },
    set_bullet(bullet){
        this.bullet = bullet;
    },

     // update (dt) {
     //    this.goto_track_target();
     // },
    make(num) {
        if (!this.bullet) {
            return;
        }
        this.pool = new cc.NodePool(this.bullet.name);

        for (var i = 0;i <num; i++) {
            var bullet = cc.instantiate(this.bullet);
            bullet.getComponent('bullet').bullet_pool = this.pool;
            this.pool.put(bullet);
        }
    },
    get_one(){
        var bullet = this.pool.get();
        // bullet.parent = GAME.canvas;
        return bullet;
    }
});