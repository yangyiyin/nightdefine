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
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
 //   console.log(22);
  //  console.log(this.getComponent(cc.ProgressBar).progress);
         cc.loader.loadResDir('res',function(completedCount,totalCount,item){

             this.getComponent(cc.ProgressBar).progress = completedCount / totalCount;
//             console.log(completedCount);
//             console.log(totalCount);
             if (this.getComponent(cc.ProgressBar).progress == 1) {
//                 console.log(99);
//                 cc.director.loadScene('main');
             }
         }.bind(this),function(){
             cc.director.loadScene('main');
         })

     },

    start () {

    },

     update (dt) {

     },
});
