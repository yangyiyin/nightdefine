/**
 * Created by yyy on 18/2/4.
 */
var GAME = require('game');
cc.Class({
    extends: cc.Component,
    properties: {
        tower: null,
        tower_can_build: true
    },
    onLoad: function () {
        this.tower || cc.loader.loadRes("prefab/tower1", function (t, e) {
            this.tower = e
        }.bind(this));
        var t = null, e = null;
        this.node.on(cc.Node.EventType.TOUCH_START, function (n) {
            this.tower && ((t = cc.instantiate(this.tower)).parent = GAME.canvas, e = t.getChildByName("head"), this.tower_can_build = t.getComponent("tower").preview_tower(n.getLocation()))
        }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            t && (this.tower_can_build = t.getComponent("tower").preview_tower(e.getLocation()))
        }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            t && (this.tower_can_build = t.getComponent("tower").preview_tower(e.getLocation()), this.tower_can_build ? t.getComponent("tower").build_tower(e.getLocation()) : t.destroy())
        }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            t && t.destroy()
        }, this)
    }, start: function () {
    }
});