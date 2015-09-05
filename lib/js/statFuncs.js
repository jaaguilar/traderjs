"strict mode"

var assert = require("assert");
var misc = require('./miscelanea')

function initData(data,period){
  assert.notEqual(period,undefined,"initData: period must not be undefined.");
  //assert.equal([period],misc.roundDec([period],0),"initData: period must be a positive integer.");       
  //assert([period]==misc.roundDec([period],0),"initData: period must be a positive integer.");         
  assert(period>0,"initData: period must be greater than zero."); 
  //fill zeros an array with period length
  var head =  Array.apply(null, new Array(period-1)).map(Number.prototype.valueOf,0);
  var seed = data.slice(0,period);
  var feed = data.slice(period);
  return [head,seed,feed];
}

function statEMA (data,period,precision){
  assert.notEqual(period,undefined,"statEMA: period must not be undefined.");
  assert.notEqual(period,null,"statEMA: period must not be null value.");    
  assert.equal(period % 1, 0,"initData: period must be a positive integer.");       
  assert(period>0,"statEMA: period must be greater than zero."); 
  if (precision !== undefined){
    assert.equal(precision % 1, 0,"statEMA: precision must be a positive integer.");       
    assert(precision>0,"statEMA: precision must be greater than zero."); 
  }

  var seed = data.slice(0,period);
  var feed = data.slice(period);
  //fill zeros an array with period length
  var head = Array.apply(null, new Array(period-1)).map(Number.prototype.valueOf,0);
  var bitIni = misc.sum(seed)/period;
  var k = 2/(period+1);

  head[period-1] = bitIni;
  ema = feed.map(function(bit,a,i){
    bitIni = (bit*k)+(bitIni*(1-k));
    return bitIni;
  })
  if (precision === undefined){
    return head.concat(ema);
  }else{
    return misc.roundDec(head.concat(ema),precision);
  }
}


module.exports = {

  statSMA: function statSMA(data,period,precision){
    assert.notEqual(period,undefined,"statSMA: period must not be undefined.");
    assert.notEqual(period,null,"statSMA: period must not be null value.");    
    assert.equal(period % 1, 0,"initData: period must be a positive integer.");       
    assert(period>0,"statSMA: period must be greater than zero."); 
    if (precision !== undefined){
      assert.equal(precision % 1, 0,"statSMA: precision must be a positive integer.");       
      assert(precision>0,"statSMA: precision must be greater than zero."); 
    }

    var sma = data.map(function(bit,i,a){
      return misc.sum(a.slice(i-period+1,i+1))/period;
    });

    if (precision === undefined){
      return sma;
    }else{
      return misc.roundDec(sma,precision);
    }
  },

  statEMA: statEMA,

  statStochastic: function statStochastic(close, high, low, exp, sk, sd, pk){
    var highSample = [];
    var lowSample = [];
    var Hs = 0;
    var Ls = 0;

    var Ks = close.map(function(bit,i,a){
      if (i >= pk){
        console.log("pk %d i %d",pk,i);
        highSample = high.slice(i-pk,i);
        console.log("hSample %s",JSON.stringify(highSample));
        lowSample = low.slice(i-pk,i);                      
        console.log("lSample %s",JSON.stringify(lowSample));
        //reduce to the max item of the array of highSample
        if (highSample.length > 0){
          Hs = highSample.reduce(function(ac,bit){
            return Math.max(ac,bit);
          });
        }
        //reduce to the max item of the array of lowSample
        if (lowSample.length > 0){
          Ls = lowSample.reduce(function(ac,bit){
            return Math.min(ac,bit);
          });
        }
        console.log("Hs %s",Hs);
        console.log("Ls %s",Ls);

        return (bit-Ls)/(Hs-Ls)*100;

 Ks(i) = (close(i)-Ls)/(Hs-Ls)*100;

      }
      else return 0;
    });

    var headK = Array.apply(null, new Array(pk-1)).map(Number.prototype.valueOf,0);
    var headD = Array.apply(null, new Array(pk+sk-1)).map(Number.prototype.valueOf,0);

    console.log("Ks %s",Ks);

    if (exp){
        K = headK.concat(statEMA(Ks.slice(pk),sk));
        D = headD.concat(statEMA(K.slice(pk+sk-2),sd));    
    }else{
        K = headK.concat(statSMA(Ks.slice(pk),sk));
        D = headD.concat(statSMA(K.slice(pk+sk-2),sd));    
    }
    return [K,D];

/*
    if exp
        K(pk:end) = calculateEMA(Ks(pk:end),sk);    
        D(pk+sk-1:end) = calculateEMA(K(pk+sk-1:end),sd);    
    else
        K(pk:end) = calculateSMA(Ks(pk:end),sk);    
        D(max(1,pk+sk-1):end) = calculateSMA(K(max(1,pk+sk-1):end),sd);    
    end
*/




  }  




}

