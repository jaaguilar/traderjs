"strict mode"

module.exports =  {
  sum: function sum(a){
    return a.reduce(function(acc, act){ 
      return acc + act; 
    },0);
  },
  roundDec: function roundDec(a,precision){
    if (precision===undefined) precision = 0;
    if (precision<0) throw "roundDec: precision must be a positive Integer";
    return a.map(function(num){
      return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
    });
  }
}