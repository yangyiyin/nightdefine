// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

//普通塔的价值计算公式
//value = 14r * hurt_value / attack_speed(攻击频率帧数)
//减速塔造价
//value = 2 * 减速倍数 * 14r
//怪物死亡掉落金币计算公式
//value = 0.01 * speed * 血量
//难度系数
//当前关怪物总value * 系数0.03
//每一关难度 <= 当前总钱数 * 系数0.03
// 每一关难度上升 区间(0.2 , 0.5)



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
        level_enemy_num_modify:1,
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
                life:this.level * 100

            });
        }.bind(this));
    },
    init_tower_list(){
        GAME.canvas.getChildByName('tower_list').zIndex = 4;

        var list = ['tower1','tower2'];
        for(var i in list) {
            (function (i,list) {
                cc.loader.loadRes("prefab/"+list[i], function (t, e) {
                    //console.log(this.tower_list);
                    this.tower_list[list[i]] = e;
                    //this.tower_list.tower1.parent = GAME.canvas.getChildByName('tower_list');
                }.bind(this));
                cc.loader.loadRes("prefab/tower_list/"+list[i], function (t, e) {
                    var tower = cc.instantiate(e);
                    //tower.y = i * 100;
                    tower.parent = GAME.canvas.getChildByName('tower_list');
                    tower.y = - (i * 100);
                }.bind(this));
            }.bind(this))(i,list)
            //console.log(list[i])


        }
        // console.log(this.tower_list.tower1);
        // console.log(this.tower_list.tower2);
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
