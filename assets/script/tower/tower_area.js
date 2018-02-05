// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

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
        target :null,
        targets :[],
        i:0
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         //显示区域
        //this.show_area();

     },

    start () {

    },

     update (dt) {
        this.i++;
     },

    onCollisionEnter: function (other, self) {
        if (!other.node || !cc.isValid(other.node)) {
            return;
        }
        if (!this.target) {
            this.target = other.node;
        }
        this.targets.push(other.node);
        //console.log(JSON.stringify(this.target.getPosition()));
        console.log(this.i);

    },
    onCollisionStay: function (other, self) {
        // if (this.target) {
        //     console.log(JSON.stringify(this.target.getPosition()));
        // }
        // console.log(JSON.stringify(this.target.getPosition()));
        // if (!other.node || !cc.isValid(other.node)) {
        //     this.remove_target(other.node);
        // }
    },
    onCollisionExit: function (other, self) {
       // this.target = null;
        this.remove_target(other.node);
       // console.log('on collision exit');
        console.log(this.i);
        console.log(other.node.getComponent('enemy').life);
    },

    show_area() {
        var ctx = this.node.getComponent(cc.Graphics);
        //this.node.getComponent(cc.CircleCollider).radius = 100;
        var radius = this.node.getComponent(cc.CircleCollider).radius;
        ctx.circle(this.node.x,this.node.y, radius);
        ctx.stroke();
    },
    hide_area() {
        var ctx = this.node.getComponent(cc.Graphics);
        ctx.clear ();
    },
    remove_target(target){
        if (!this.targets.length) {
            return;
        }
        var index = -1;
        for (var i in this.targets) {
            if (this.targets[i].tag_name == target.tag_name) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.targets.splice(index,1);
        }
        if (this.targets.length) {
            this.target = this.targets[0];
        } else {
            this.target = null;
        }
    }
});
