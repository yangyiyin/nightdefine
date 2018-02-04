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
       // build_tower:null,
        make_enemy:null,
        level:1,
        level_enemy_num_modify:5,
        tower_list:null
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
//    console.log(cc.director.isPaused());
         //初始化
    this.tower_list = {};
        // this.init_build_tower();
         this.init_make_enemy();
        this.init_tower_list();

     },

    start () {

    },

    // update (dt) {},

//    init_build_tower(){
//        cc.loader.loadRes("prefab/build_tower", function (err, build_tower) {
//
//            this.build_tower = cc.instantiate(build_tower);
//            this.build_tower.parent = this.node;
//        }.bind(this));
//    },
    init_make_enemy(){
        cc.loader.loadRes("prefab/make_enemy", function (err, make_enemy) {
          //  console.log(123);
            this.make_enemy = cc.instantiate(make_enemy);
            this.make_enemy.parent = this.node;
            this.make_enemy.getComponent('make_enemy').init({
                num_max:this.level * this.level_enemy_num_modify,
                speed_x:this.level * 100,
                life:this.level * 10

            });
        }.bind(this));
    },
    init_tower_list(){
        GAME.canvas.getChildByName('tower_list').zIndex = 4;
        cc.loader.loadRes("prefab/tower1", function (t, e) {
            //console.log(this.tower_list);
            this.tower_list.tower1 = e;
            //this.tower_list.tower1.parent = GAME.canvas.getChildByName('tower_list');
        }.bind(this));
        cc.loader.loadRes("prefab/tower_list/tower1", function (t, e) {
            var tower1 = cc.instantiate(e);
            tower1.parent = GAME.canvas.getChildByName('tower_list');
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
