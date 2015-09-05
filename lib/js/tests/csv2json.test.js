//Converter Class 
var fs = require("fs");
var Converter = require("csvtojson").Converter;
var fileStream = fs.createReadStream("./data/file.csv");
//new converter instance 
var param={delimiter: ';'};
var converter = new Converter(param);
//to store result JSON-Array
var result = {}
 

//end_parsed will be emitted once parsing finished 
converter.on("end_parsed", function (jsonObj) {
   console.log(jsonObj); //here is your result json object 
   console.log(result);
});

converter.on("record_parsed",function(resultRow,rawRow,rowIndex){
  for (var key in resultRow) {
    if (typeof(resultRow[key]) == "string" && /^[+-]?\d+(,\d+)?$/.test(resultRow[key])){
      resultRow[key] = parseFloat(resultRow[key].replace(',','.'));  
    }
    if (!result[key] || !result[key] instanceof Array) {
        result[key] = [];
    }
    result[key][rowIndex] = resultRow[key];
  }

  //console.log("res %s",JSON.stringify(resultRow)); //here is your result json object 

});
 
console.log(JSON.stringify(require('util').inspect(converter.listeners('record_parsed')))); 
//read from file 
fileStream.pipe(converter);
console.log(result);