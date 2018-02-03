/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 16-7-16
 * Time: 下午8:52
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    getDistanceBy2Point:function(point1,point2){
        return  Math.sqrt(Math.pow((point1.x-point2.x),2) + Math.pow((point1.y-point2.y),2));
    },
    getXYDistanceBy2Point:function(point1,point2){
        return  {x_d : point2.x - point1.x, y_d : point2.y - point1.y};
    },

    getRotation : function(cur_p,next_p){
        var rotation = Math.atan((cur_p.x-next_p.x)/(cur_p.y-next_p.y))*180/Math.PI;
        if(rotation > 0 && cur_p.x-next_p.x < 0) {
            rotation += 180;
        }
        if(rotation < 0 && cur_p.x-next_p.x > 0) {
            rotation += 180;
        }
        if (cur_p.init_rotation) {
            rotation += cur_p.init_rotation;
        }
        if (rotation < 0) {
            rotation += 360;
        }
        return rotation;
    },

    getPointByRotationAndDistance: function (cur_point, rotation, distance) {
        var point = {};
        if (rotation == 180) {
            point.x = cur_point.x;
        } else {
            var x_d = distance * Math.sin(Math.PI/180 * rotation);
            point.x = cur_point.x - x_d;
        }

        if (rotation == 90 || rotation == 270) {
            point.y = cur_point.y;
        } else {
            var y_d = distance * Math.cos(Math.PI/180 * rotation);
            point.y = cur_point.y - y_d;
        }

        return point;
    },
    rand : function(min, max) {
        return parseInt((max - min) * Math.random() + min);
    }
}