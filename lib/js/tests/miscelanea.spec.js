var misc = require('../miscelanea')

describe('sum', function() {
   it('should sum elements of an array', function(){
       var arr = [1,2,3,4,5,6,7,8,9,10];
       var sum = misc.sum(arr);
       expect(sum).toBe(55);
   });
   it('should sum elements of an array', function (){
       var arr = [11,22,33,44,55,66,77,88,99,100];
       var sum = misc.sum(arr);
       expect(sum).toBe(595);
   });
   it('should sum an empty array with zero as result', function (){
       var arr = [];
       var sum = misc.sum(arr);
       expect(sum).toBe(0);
   });

});

var arr = [0,
  164.6528571429,164.6111428571,164.5763238095,164.5461473016,164.5119943280,164.5023950843,
  164.4887424064,164.4609100855,164.5127887408,164.6217502420,164.7921835431,164.9305590707,
  165.0424845279,165.1541532575,165.2349328232,165.3396084468,165.4343273205,165.5110836778];

describe('roundDec', function() {
  it('should round elements of an array to 1 decimals', function(){
     var rounded = misc.roundDec([1.22],1);
     expect(rounded).toEqual([1.2]);
  })  

  it('should round elements of an array to 0 decimals', function(){
     var rounded = misc.roundDec([165.5110836778],0);
     expect(rounded).toEqual([166]);
  })  

  it('should round elements of an array to 0 decimals, with no precision specified', function(){
     var rounded = misc.roundDec([165.5110836778]);
     expect(rounded).toEqual([166]);
  })  

  it('should round elements of an array to 0 decimals', function(){
     var rounded = misc.roundDec(arr,0);
     expect(rounded).toEqual([0,165,165,165,165,165,165,164,164,165,165,165,165,165,165,165,165,165,166]);
  })

  it('should round elements of an array to 1 decimals', function(){
     var rounded = misc.roundDec(arr,1);
     expect(rounded).toEqual([0,164.7,164.6,164.6,164.5,164.5,164.5,164.5,164.5,164.5,164.6,164.8,164.9,165.0,165.2,165.2,165.3,165.4,165.5]);
  })  

  it('should round elements of an array to 2 decimals', function(){
     var rounded = misc.roundDec(arr,2);
     expect(rounded).toEqual([0,164.65,164.61,164.58,164.55,164.51,164.50,164.49,164.46,164.51,164.62,164.79,164.93,165.04,165.15,165.23,165.34,165.43,165.51]);

  })  

  it('should round elements of an array to 3 decimals', function(){
     var rounded = misc.roundDec(arr,3);
     expect(rounded).toEqual([0,164.653,164.611,164.576,164.546,164.512,164.502,164.489,164.461,164.513,164.622,164.792,164.931,165.042,165.154,165.235,165.340,165.434,165.511]);
  })  

  it('should round elements of an array to 4 decimals', function(){
     var rounded = misc.roundDec(arr.map(function(x) { return x * -1; }),4);
     expect(rounded).toEqual([0,-164.6529,-164.6111,-164.5763,-164.5461,-164.5120,-164.5024,-164.4887,-164.4609,-164.5128,-164.6218,-164.7922,-164.9306,-165.0425,-165.1542,-165.2349,-165.3396,-165.4343,-165.5111]);
  })

  it('should round elements of an array to 5 decimals', function(){
     var rounded = misc.roundDec(arr,5);
     expect(rounded).toEqual([0,164.65286,164.61114,164.57632,164.54615,164.51199,164.50240,164.48874,164.46091,164.51279,164.62175,164.79218,164.93056,165.04248,165.15415,165.23493,165.33961,165.43433,165.51108]);
  })  

  it('should round an arry of zeros to 5 decimals', function(){
     var rounded = misc.roundDec([0,0,0,0,0,0,0,0,0],5);
     expect(rounded).toEqual([0,0,0,0,0,0,0,0,0]);
  })  

});