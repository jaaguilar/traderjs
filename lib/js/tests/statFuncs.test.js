statFuncs = require('../statFuncs');
StockDataImport = require('../classes/StockDataImport');

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var arr2 = [164.92,164.92,165.2,165.07,165.2,165.26,165.07,164.41,163.98,163.81,164.09,
164.37,164.44,164.4,164.34,164.35,164.35,164.29,164.44,164.4,164.28,164.85,165.33,165.9,
165.83,165.77,165.88,165.76,166.02,166.05,166.01,166.04,165.88,165.77,165.94,165.84,165.98,
166.31,165.89,166.15,166.03,165.98,166.17,165.92,165.85,165.84,165.95,165.98,165.96]
var res2_ema =  [0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
   164.6528571428571,
   164.6111428571428,
   164.5763238095238,
   164.5461473015873,
   164.5119943280423,
   164.5023950843034,
   164.4887424063962,
   164.4609100855434,
   164.5127887408043,
   164.6217502420304,
   164.7921835430930,
   164.9305590706806,
   165.0424845279232,
   165.1541532575334,
   165.2349328231957,
   165.3396084467696,
   165.4343273205336,
   165.5110836777958,
   165.5816058540897,
   165.6213917402111,
   165.6412061748496,
   165.6810453515364,
   165.7022393046649,
   165.7392740640429,
   165.8153708555038,
   165.8253214081033,
   165.8686118870229,
   165.8901303020865,
   165.9021129284750,
   165.9378312046783,
   165.9354537107213,
   165.9240598826251,
   165.9128518982751,
   165.9178049785051,
   165.9260976480377,
   165.9306179616327];
var period = 14;

func = process.argv[2];

console.log("test function %s",func);

if (func == "statSMA"){
  console.log("test SMA")  
  var res = statFuncs.statSMA(arr,period);
  console.log(res);
  period = 14;
  res = statFuncs.statSMA(arr2,period);
  console.log(res);
}

if (func == "statEMA"){
  console.log("test EMA")
  var res = statFuncs.statEMA(arr,period);
  console.log(res);
  period = 14;
  res = statFuncs.statEMA(arr2,period);
  console.log(res);
  console.log(JSON.stringify(res)==JSON.stringify(res2_ema));
}

if (func == "statStochastic"){
  console.log("test stochastic")
  var exp = true;
  var sk = 6;
  var sd = 3;
  var pk = 2;
  var result = false;
  var stockData = {};
  var stockDI = new StockDataImport('test Stochastic');
  stockDI.on('data',function(data){
    stockData = data;
    res = statFuncs.statStochastic(stockData.Close, stockData.High, stockData.Low, exp, sk, sd, pk);
    console.log(res);

    result = true;
  });

  result = false;
  stockDI.parse('./data/file.csv');

}