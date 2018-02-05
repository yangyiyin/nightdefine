// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var GAME = require('game');
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
        tower: null,
        tower_can_build: true
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        // this.tower = GAME.canvas.getChildByName('action').getChildByName('game_center').getComponent('game_center').tower_list[this.node.name];
        //  console.log(GAME.canvas.getChildByName('action').getChildByName('game_center').getComponent('game_center').tower_list.tower1);
        var t = null;
         var selling_price = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, function (n) {
            this.tower = GAME.canvas.getChildByName('action').getChildByName('game_center').getComponent('game_center').tower_list[this.node.name];
            this.tower && (t = cc.instantiate(this.tower));
            selling_price = parseInt(t.getComponent("tower").selling_price);
            if (!selling_price || GAME.canvas.getChildByName('gold').getChildByName('value').getComponent('gold').get_value() < selling_price) {
                t = null;
                return;
            }
            //console.log(GAME.canvas.getChildByName('action').getChildByName('game_center').getComponent('game_center').tower_list.tower1);
//console.log(n.getLocation());
            t && (t.parent = GAME.canvas, this.tower_can_build = t.getComponent("tower").preview_tower(n.getLocation()))
        }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            //console.log(e.getLocation());
            t && (this.tower_can_build = t.getComponent("tower").preview_tower(e.getLocation()))
        }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {

            if (t) {
                this.tower_can_build = t.getComponent("tower").preview_tower(e.getLocation());

                if (this.tower_can_build){
                    t.getComponent("tower").build_tower(e.getLocation());
                    GAME.canvas.getChildByName('gold').getChildByName('value').getComponent('gold').modify(-50);

                } else {
                    t.destroy();
                }
            }

        }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            if (t) {
                this.tower_can_build = t.getComponent("tower").preview_tower(e.getLocation());

                if (this.tower_can_build){
                    t.getComponent("tower").build_tower(e.getLocation());
                    //var selling_price = parseInt(t.getComponent("tower").selling_price);
                    GAME.canvas.getChildByName('gold').getChildByName('value').getComponent('gold').modify(-selling_price);

                } else {
                    t.destroy();
                }
            }
            //t && t.destroy()
        }, this)
      },

    start () {

    },

    // update (dt) {},
});
