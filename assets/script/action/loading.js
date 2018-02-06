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
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
 //   console.log(22);
  //  console.log(this.getComponent(cc.ProgressBar).progress);
         cc.loader.loadResDir('res',function(completedCount,totalCount,item){

             this.getComponent(cc.ProgressBar).progress = (completedCount / totalCount) * 0.5;

         }.bind(this),function(){
                 cc.loader.loadResDir('prefab',function(completedCount2,totalCount2,item2){
                     this.getComponent(cc.ProgressBar).progress = 0.5 + (completedCount2 / totalCount2) * 0.3;
                 }.bind(this),function(){
                     this.init_resource();
                     //cc.director.loadScene('main');
                 }.bind(this));

         }.bind(this))

     },

    start () {

    },

     update (dt) {

     },
    init_resource(){
        var resource_path_list = this.get_resource_path_list();
        var length = resource_path_list.length;
        if (!length) {
            return;
        }
        for(var i in resource_path_list) {
            (function (i,list) {
                cc.loader.loadRes(list[i], function (t, e) {
                  //  console.log(JSON.stringify(t));
                    if (t) {
                        //远程获取
                        var remoteUrl = "http://88plus.net/"+list[i];
                        cc.loader.load(remoteUrl, function (err, e) {
                          //  console.log(JSON.stringify(err));


                            GAME.resource[list[i]] = e;
                            this.getComponent(cc.ProgressBar).progress += (0.2/length);
                            //console.log(this.getComponent(cc.ProgressBar).progress);
                            if (this.getComponent(cc.ProgressBar).progress >= 0.99999999) {

                                cc.director.loadScene('main');
                            }

                        }.bind(this));


                    } else {
                        GAME.resource[list[i]] = e;
                        this.getComponent(cc.ProgressBar).progress += (0.2/length);

                        if (this.getComponent(cc.ProgressBar).progress == 1) {
                            cc.director.loadScene('main');
                        }
                    }

                }.bind(this));
            }.bind(this))(i,resource_path_list);


        }

    },
    get_resource_path_list(){
        return [
            'prefab/tower_list/tower1',
            'prefab/tower_list/tower2',
            'prefab/tower1',
            'prefab/tower2',
            'prefab/build_tower',
            'prefab/bullet',
            'prefab/bullet2',
            'prefab/enemy1',
            'prefab/enemy2',
            'prefab/make_bullet',
            'prefab/make_enemy'

        ];
    }
});
