  var file = './data/file.csv';
  var fs = require("fs");

  if (!fs.existsSync(file)) throw "no file exists or path is incorrect."

  var Converter = require("csvtojson").Converter;

  var fileStream = fs.createReadStream(file);
  //new converter instance 
  var param={delimiter: ';'};
  var converter = new Converter(param);
  //to store result JSON-Array
  var result = {}

  //end_parsed will be emitted once parsing finished 
  converter.on("end_parsed", function (jsonObj) {
    console.log(jsonObj);
    console.log(result);    
    console.log("finalizando...");
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
  });


  //read from file 
  fileStream.pipe(converter);

  console.log(result);      
