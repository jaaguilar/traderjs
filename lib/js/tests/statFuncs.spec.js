statFuncs = require('../statFuncs');
misc = require('../miscelanea');
var StockDataImport = require('../classes/StockDataImport');



var inp = [164.92,164.92,165.2,165.07,165.2,165.26,165.07,164.41,163.98,163.81,164.09,164.37,164.44,
  164.4,164.34,164.35,164.35,164.29,164.44,164.4,164.28,164.85,165.33,165.9,165.83,165.77,165.88,
  165.76,166.02,166.05,166.01,166.04,165.88,165.77,165.94,165.84,165.98,166.31,165.89,166.15,166.03,
  165.98,166.17,165.92,165.85,165.84,165.95,165.98,165.96];
var res_sma_14 = [0,0,0,0,0,0,0,0,0,0,0,0,0,164.6528571428571,164.6114285714286,164.5707142857143,
  164.5100000000000,164.4542857142857,164.4000000000000,164.3385714285714,164.2821428571428,
  164.3135714285714,164.4100000000000,164.5592857142858,164.6835714285714,164.7835714285714,
  164.8864285714286,164.9835714285714,165.1035714285715,165.2250000000000,165.3435714285714,
  165.4685714285714,165.5714285714286,165.6692857142857,165.7878571428572,165.8585714285714,
  165.9050000000000,165.9342857142857,165.9385714285714,165.9657142857143,165.9764285714286,
  165.9921428571429,166.0028571428572,165.9935714285714,165.9821428571429,165.9678571428572,
  165.9728571428571,165.9878571428571,165.9892857142857]
var res_ema_14 = [0,0,0,0,0,0,0,0,0,0,0,0,0,164.6528571428571,164.6111428571428,164.5763238095238,
  164.5461473015873,164.5119943280423,164.5023950843034,164.4887424063962,164.4609100855434,
  164.5127887408043,164.6217502420304,164.7921835430930,164.9305590706806,165.0424845279232,
  165.1541532575334,165.2349328231957,165.3396084467696,165.4343273205336,165.5110836777958,
  165.5816058540897,165.6213917402111,165.6412061748496,165.6810453515364,165.7022393046649,
  165.7392740640429,165.8153708555038,165.8253214081033,165.8686118870229,165.8901303020865,
  165.9021129284750,165.9378312046783,165.9354537107213,165.9240598826251,165.9128518982751,
  165.9178049785051,165.9260976480377,165.9306179616327]
var inp2 = [164.92,164.92,165.20,165.07,165.20,165.26,165.07,164.41];
var res_sma_4 = [0,0,0,165.0275,165.0975,165.1825,165.1500,164.9850];
var res_ema_4 = [0,0,0,165.0275,165.0965,165.1619,165.12514,164.839084];
var res_stoK_true_6_3_2 = [0,0,0,0,0,0,66.837497958276757,70.392467485725660,76.538286492117521,
  82.794476843664057,72.641741269232142,64.844603419157266,62.304910633786854,46.771354000509895,
  37.465465284485369,29.990749727967188];
var res_stoD_true_6_3_2 = [0,0,0,0,0,0,0,0,71.256083978706641,77.025280411185349,74.833510840208746,
  69.839057129682999,66.071983881734923,56.421668941122405,46.943567112803890,38.467158420385537];

describe('statSMA', function() {
   it('should return Simple Moving Average with period 4 of elements of an array', function(){
      var period = 4;
      var prec = 10;
      res = statFuncs.statSMA(inp2,period,prec)
      expect(res).toEqual(misc.roundDec(res_sma_4,prec));
   });
   it('should return Simple Moving Average with period 14 of elements of an array', function(){
      var period = 14;
      var prec = 10;
      res = statFuncs.statSMA(inp,period,prec)
      expect(res).toEqual(misc.roundDec(res_sma_14,prec));
   });
});

describe('statEMA', function() {
   it('should return Exponential Moving Average with period 4 of elements of an array', function(){
      var period = 4;
      var prec = 10;
      res = statFuncs.statEMA(inp2,period,prec)
      expect(res).toEqual(misc.roundDec(res_ema_4,prec));
   });
   it('should return Exponential Moving Average with period 4 of elements of an array', function(){
      var period = 14;
      var prec = 10;
      res = statFuncs.statEMA(inp,period,prec)
      expect(res).toEqual(misc.roundDec(res_ema_14,prec));
   });
   it('should return Exponential Moving Average with period 4 of elements of an array', function(){
      var period = 14;
      var prec = 10;
      res = statFuncs.statEMA(inp,period,prec)
      expect(res).toEqual(misc.roundDec(res_ema_14,prec));
   });
});

describe('statStochastic', function() {
   it('should return Stochastic index with exp = true, sk = 6, sd = 3, pk = 2 params of elements of an array', function(){
      var exp = 12;
      var sk = 6;
      var sd = 3;
      var pk = 2;
      var result = false;
      var stockData = {};
      var stockDI = new StockDataImport('test Stochastic');
      stockDI.on('data',function(data){
          stockData = data;   
          result = true;
      });

      runs(function(){
          result = false;
          stockDI.parse('./data/file.csv');
      })

      waitsFor(function(){
          return result;
      }, "The json objects must be equal", 100);

      runs(function(){
        res = statFuncs.statStochastic(stockData.Close, stockData.High, stockData.Low, exp, sk, sd, pk);
        expect(res[0]).toEqual(res_stoK_true_6_3_2);
        expect(res[1]).toEqual(res_stoD_true_6_3_2);        
      });
   });
});