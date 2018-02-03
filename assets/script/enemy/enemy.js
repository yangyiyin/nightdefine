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
        life_max : 120,
        life : 120
        //resume_map_color_time:120
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.zIndex = 2;
        this.body = this.getComponent(cc.RigidBody);
    },

    start () {

    },

    update (dt) {
        var speed = this.body.linearVelocity;
        speed.x = 250;

        this.body.linearVelocity = speed;



    },

    onCollisionEnter: function (other, self) {

       if (other.node.group == 'tower_bullet') {
           this.hurt(1);
       }

        if (other.node.group == 'end') {
            this.node.destroy();
            GAME.canvas.getChildByName('map').getComponent('map').red_map();
        //   this.red_map();

        }


    },
    hurt(value) {
        this.life -= parseInt(value);
        if (this.life <= 0) {
            this.die();
            return;
        }
        this.set_life_line();

    },
    set_life_line(){
        var width_max = this.node.getChildByName('life').width;
        var mask = this.node.getChildByName('life').getChildByName('mask');
        var width = width_max * this.life / this.life_max;
        mask.width = width;
    },
    die(){
        this.node.destroy();
    }

});
