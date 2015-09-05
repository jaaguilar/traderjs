var fs = require("fs");
var rs=fs.createReadStream("./file.csv");
var CSVAdv= require("csvtojson").Converter;
var result = {}
var param={delimiter: ';'};
var csvConverter=new CSVAdv(param);

//end_parsed will be emitted once parsing finished 
csvConverter.on("end_parsed", function(jsonObj) {
    console.log(result);
    console.log(jsonObj);    
    console.log("Finished parsing");
    //done();
});
 
//record_parsed will be emitted each time a row has been parsed. 
csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
 
    for (var key in resultRow) {
        if (!result[key] || !result[key] instanceof Array) {
            result[key] = [];
        }
        result[key][rowIndex] = resultRow[key];
    }
 
});
rs.pipe(csvConverter);