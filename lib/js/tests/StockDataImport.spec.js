var misc = require('../miscelanea');
var StockDataImport = require('../classes/StockDataImport');

var jsonarrayOk = 
{ Date: 
    [ 
    20140102,
     20140103,
     20140106,
     20140107,
     20140108,
     20140109,
     20140110,
     20140113,
     20140114,
     20140115,
     20140116,
     20140117,
     20140120,
     20140121,
     20140122,
     20140123 ],
  Time: 
   [ 1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730,
     1730 ],
  Open: 
   [ 9926.5,
     9764.9,
     9767.4,
     9911.5,
     10186.8,
     10255.9,
     10293.1,
     10336.2,
     10270.6,
     10380.3,
     10525,
     10465.7,
     10444,
     10470.4,
     10397.2,
     10251.6 ],
  High: 
   [ 9952,
     9830.1,
     9928.7,
     10188.5,
     10282,
     10383,
     10361.8,
     10396,
     10382,
     10529.8,
     10552.7,
     10501.8,
     10485.9,
     10510.5,
     10440.5,
     10350.9 ],
  Low: 
   [ 9758.4,
     9722.5,
     9766.4,
     9881.9,
     10117.2,
     10186.3,
     10248.8,
     10298.3,
     10223.1,
     10368.4,
     10441.4,
     10393.5,
     10403.5,
     10344.2,
     10241.5,
     10215.8 ],
  Close: 
   [ 9760.3,
     9798,
     9888.5,
     10178.7,
     10253.6,
     10234.2,
     10290.6,
     10365.5,
     10382,
     10525,
     10455.5,
     10465.7,
     10454.1,
     10357.4,
     10279.7,
     10241.2 ],
  Volume: 
   [ 304375,
     209216,
     188619,
     514204,
     479865,
     389287,
     283436,
     347556,
     343749,
     381454,
     331148,
     288502,
     183408,
     239283,
     295355,
     327843 ] 
}

describe('StockDataImport', function() {
  it('should construct a StockDataImport object', function(){
    var stockDI = new StockDataImport('test construct');
    expect(stockDI.name).toEqual('test construct')
  });
});


describe('StockDataImport', function() {
    var result = false;
    var stockDI = new StockDataImport('test construct');
    stockDI.on('data',function(data){
        console.log('echo!');
        expect(data).toEqual(jsonarrayOk);   
        result = true;
    });

    it('should construct a StockDataImport object', function(){
        runs(function(){
            result = false;
            stockDI.parse('./data/file.csv');
        })

        waitsFor(function(){
            return result;
        }, "The json objects must be equal", 100);
     
    });


});
    