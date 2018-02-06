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
        enemy_list:[],
        num_max:0,
        num:0,
        i:0,
        modify_i:100,
        pool:null,
        die_num:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pool = new cc.NodePool('enemy_pool');
    },

    start () {

    },

    update (dt) {

        if (!(this.i % this.modify_i)) {

            this.modify_i = this.make();
        }
        this.i++;
        if (this.i > this.modify_i) {
            this.i = 1;
        }
    },
    make(){

        if (!this.enemy_list.length) {
            return ;
        }

        var enemy = this.enemy_list[0];
        // this.enemy_list.splice(0,1);
       // console.log(enemy);
        if (!enemy) {
            return;
        }
        this.enemy_list.splice(0,1);
        //var enemy = cc.instantiate(this.enemy);
        enemy.tag_name = enemy.name + '-' + this.num;
       // console.log(enemy.tag_name);
        enemy.parent = GAME.canvas;
        this.num ++;
        var next_enemy = this.enemy_list[0];
        if (!next_enemy) {
            return 0;
        } else {
            return parseInt(100 * next_enemy.getComponent(cc.PhysicsCircleCollider).radius * next_enemy.scaleX / next_enemy.getComponent('enemy').speed_x);

        }
    },
    init(list){
        this.num_max = 0;
        for(var i in list) {
            for(var j = 0; j < list[i].num; j++) {

                var enemy = cc.instantiate(GAME.resource["prefab/" + list[i].name]);

                enemy.getComponent('enemy').init({
                    speed_x: list[i].speed_x,
                    life_max: list[i].life,
                    life: list[i].life
                });
                //console.log(enemy.name);
                this.enemy_list.push(enemy);

            }
            this.num_max += list[i].num;
        }

        this.num = 0;
        this.die_num = 0;
        this.i = 0;
    },
    check_is_no_enemy(){
        return this.die_num == this.num_max;
    }
});
