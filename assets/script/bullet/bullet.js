// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var math = require('math');
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

        track_target:null,
        speed:10,
        bullet_pool:null,
        x_speed_scale:0,
        y_speed_scale:0
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

     },

    start () {

    },

     update (dt) {
        this.goto_track_target();
     },

    set_track_target(target) {

        this.track_target = target;
    },
    goto_track_target() {

        if (!this.track_target || !cc.isValid(this.track_target)) {
           // console.log(123);
            if (this.x_speed_scale || this.y_speed_scale) {
                this.node.x += this.x_speed_scale * this.speed;
                this.node.y += this.y_speed_scale * this.speed;
                return;
            } else {
                this.bullet_pool.put(this.node);
            }

        }

        var point = this.node.getPosition();
        var cursor = this.track_target.getPosition();
        var radius = math.getDistanceBy2Point(point, cursor);

        this.node.rotation = math.getRotation(point, cursor);
        if (radius) {
            this.x_speed_scale = (cursor.x - point.x) / radius;
            this.y_speed_scale = (cursor.y - point.y) / radius;

            this.node.x += this.x_speed_scale * this.speed;
            this.node.y += this.y_speed_scale * this.speed;
        }



    },
    onCollisionEnter: function (other, self) {
        //console.log(bullet_pool);
        if (this.bullet_pool) {
            this.bullet_pool.put(self.node);
        }
        //self.node.destroy();
        //console.log(JSON.stringify(this.target.getPosition()));


    },
});
