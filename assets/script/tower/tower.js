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
        status:1,
        tower_area: {
            default: null,
            type: cc.Node,
        },
        make_bullet:null,
        bullet:null,
        attack_speed:20,
        attack_speed_i:0,
        bullet_name:'bullet',
        selling_price:0,
        hurt_value:1

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      //  this.node.setScale(2);
      //  this.preview_tower();

    },

    start () {

    },

     update (dt) {

         this.guide();
     },

    preview_tower (head_world_position) {
        //计算高度
        this.node.opacity = 150;

        this.tower_area.getComponent('tower_area').show_area();
        var head = this.node.getChildByName('head');
        var body_mask = this.node.getChildByName('body_mask');
        var foot = this.node.getChildByName('foot');

        //把世界坐标转为本地坐标
        if (head_world_position) {
          //  console.log(123);
            head.setPosition(this.node.convertToNodeSpaceAR(head_world_position));
        }

      //  var headX = head.getPositionX();
        var headY = head.getPositionY();
        var footHeight = foot.height;
        body_mask.height = headY - footHeight;

        var towerP = this.node.convertToWorldSpaceAR(head.getPosition());
        // console.log(JSON.stringify(towerP));
        // console.log((GAME.canvas.width));return;
        this.node.setPositionX(towerP.x - GAME.canvas.width / 2);
        head.setPositionX(0);
        if (towerP.x <= 0 || towerP.x >= GAME.canvas.width || headY <= 0) {
            //console.log(1111);
            this.node.opacity = 10;
            this.tower_area.getComponent('tower_area').hide_area();
            return false;
        }
        return true;

    },
    build_tower () {
        //计算高度
        this.node.opacity = 255;
        this.status = 2;
        this.tower_area.getComponent('tower_area').hide_area();
        //init bullet
        this.init_bullet();
    },
    init_bullet() {
        //this.bulletPool = new cc.NodePool('bullet');
        this.make_bullet = cc.instantiate(GAME.resource["prefab/make_bullet"]);
        //  this.make_bullet
        this.bullet = cc.instantiate(GAME.resource["prefab/"+this.bullet_name]);
        this.make_bullet.getComponent('make_bullet').set_bullet(this.bullet);
        this.make_bullet.getComponent('make_bullet').make(10, {hurt_value:this.hurt_value});
    },
    attack(target) {
        if (!target || !cc.isValid(target)) {
            return;
        }
        //console.log(122);
        if (!this.bullet) {
            return ;
        }
        var bullet = this.make_bullet.getComponent('make_bullet').get_one();

        if (bullet) {
            var head = this.node.getChildByName('head');
            var position = this.node.convertToWorldSpaceAR(head.getPosition());
            bullet.setPosition(cc.v2(position.x - GAME.canvas.width/2, position.y - GAME.canvas.height/2));
            bullet.parent = GAME.canvas;
            bullet.getComponent('bullet').set_track_target(target);
        }
    },
    guide () {
        //每帧执行
        if (this.status == 2) {
            var target = this.tower_area.getComponent('tower_area').target;
            if (target) {
                if (this.attack_speed_i == 0) {
                    this.attack(target);
                }
                this.attack_speed_i ++;
                if (this.attack_speed_i > this.attack_speed) {
                    this.attack_speed_i = 0;
                }
            }
        }
    }

});
