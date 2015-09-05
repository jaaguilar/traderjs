misc = require('../miscelanea');

var arr = [1,2,3,4,5,6,7,8,9,10];
var arr2 = [11,10,9,8,7,6,5,4,3,2,1];

func = process.argv[2];

console.log("test function %s",func);

if (func == "sum"){
  var res = misc.sum(arr);
  console.log(res);
  res = misc.sum(arr2);
  console.log(res);
}