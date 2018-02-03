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
        enemy:null,
        num_max:1,
        num:0,
        i:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes("prefab/enemy1", function (err, enemy) {

            this.enemy = enemy;
        }.bind(this));
    },

    start () {

    },

    update (dt) {

        if (!(this.i % 20)) {
            this.make();
        }
        this.i++;
        if (this.i > 20) {
            this.i = 1;
        }
    },
    make(){

        if (!this.enemy) {
            return ;
        }
        if (this.num >= this.num_max) {
            return;
        }
        var enemy = cc.instantiate(this.enemy);
        enemy.tag_name = enemy.name + '-' + this.num;
        enemy.parent = GAME.canvas;
        this.num ++;
    }
});
