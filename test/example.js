/**
 * Created by Administrator on 16-1-6.
 */
console.log("example");
var x = 5;

var addX = function(value) {
    return x + value;
};

var addY = function(i){
    return x + i;
};
//模块的暴露

//module.exports.addX = addX;
exports.addX = addX;
module.exports.addY = addY;