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
        life_max : 1,
        life : 1,
        is_die:false,
        speed_x:100,
        die_gold_value:1
        //resume_map_color_time:120
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.zIndex = 2;
        this.body = this.getComponent(cc.RigidBody);
        this.die_gold_value = this.get_die_gold_value();
    },

    start () {

    },

    update (dt) {
        var speed = this.body.linearVelocity;
        speed.x = this.speed_x;

        this.body.linearVelocity = speed;




    },
    init(option){
        option.speed_x && (this.speed_x = option.speed_x);
        option.life && (this.life = option.life);
        option.life && (this.life_max = option.life);
    },

    onCollisionEnter: function (other, self) {
        if (!cc.isValid(this.node)) {
            return;
        }
       if (other.node.group == 'tower_bullet') {
           var hurt_value = other.node.getComponent('bullet').hurt_value;
           this.hurt(hurt_value);
       }

        if (other.node.group == 'end') {
            if(!this.is_die) {
                GAME.canvas.getChildByName('life').getChildByName('value').getComponent('life').modify(-1);
                GAME.canvas.getChildByName('action').getChildByName('game_center').getComponent('game_center').enemy_die();

            }
            this.is_die = true;
            this.node.destroy();
            GAME.canvas.getChildByName('map').getComponent('map').red_map();
        //   this.red_map();

        }


    },
    hurt(value) {
        this.life -= parseInt(value);
        if (this.life <= 0 && cc.isValid(this.node)) {
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
        if (!cc.isValid(this.node))  return;
        if(!this.is_die) {
            GAME.canvas.getChildByName('gold').getChildByName('value').getComponent('gold').modify(this.die_gold_value);
            GAME.canvas.getChildByName('action').getChildByName('game_center').getComponent('game_center').enemy_die();
        }
        this.is_die = true;
        this.node.destroy();


    },
    get_die_gold_value() {
        return parseInt(0.1 * this.speed_x * this.life_max);
    }

});
