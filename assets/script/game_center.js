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
        build_tower:null,
        make_enemy:null,
        level:1,
        level_enemy_num_modify:5
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         //初始化
         this.init_build_tower();
         this.init_make_enemy();

     },

    start () {

    },

    // update (dt) {},

    init_build_tower(){
        cc.loader.loadRes("prefab/build_tower", function (err, build_tower) {

            this.build_tower = cc.instantiate(build_tower);
            this.build_tower.parent = this.node;
        }.bind(this));
    },
    init_make_enemy(){
        cc.loader.loadRes("prefab/make_enemy", function (err, make_enemy) {
            this.make_enemy = cc.instantiate(make_enemy);
            this.make_enemy.parent = this.node;
            this.make_enemy.getComponent('make_enemy').init({
                num_max:this.level * this.level_enemy_num_modify,
                speed_x:this.level * 100,
                life:this.level * 10

            });
        }.bind(this));
    },
    enemy_die(){
        this.make_enemy.getComponent('make_enemy').die_num ++;
        var is_no_enemy = this.make_enemy.getComponent('make_enemy').check_is_no_enemy();
        if (is_no_enemy) {
            this.next_game_level();
        }
    },
    next_game_level() {
        this.level++;
        GAME.canvas.getChildByName('level').getChildByName('value').getComponent('level').set_value(this.level);

        this.make_enemy.getComponent('make_enemy').init({
            num_max:this.level * this.level_enemy_num_modify,
            speed_x:this.level * 100,
            life:this.level * 10

        });
    }

});
