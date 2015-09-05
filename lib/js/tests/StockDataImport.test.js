//var misc = require('../miscelanea');
var StockDataImport = require('../classes/StockDataImport');
var stockDI = new StockDataImport('test construct');
stockDI.on('data',function(data){
    console.log(data);
    result = true;
});
stockDI.parse('./data/file.csv');


