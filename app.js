var express = require('express');
var bodyParser = require('body-parser');

//use above classes we create this constants;;
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log("listening to port 3000");
});


app.post('/', function(req, res){
    
    const bodyData = req.body;
    let boundaries;
    var stringValues={};
    
    // create json that contains words in same line(y) according to x in ascending order 
    bodyData.forEach(element => {
        boundaries = element.boundaries[0];
        stringValues[boundaries.y] =  {
            [boundaries.x]: ""
        };
    });

    bodyData.forEach(element => {
            boundaries = element.boundaries[0];
            stringValues[boundaries.y][boundaries.x] = element.description;
    });

    var paragraph = "";
    var slctdStr = "";
    for (const key in stringValues) {
        for(const key2 in stringValues[key]){
            slctdStr = stringValues[key][key2];
            if(!isNaN(slctdStr) || slctdStr == ',' || slctdStr == '.' || slctdStr == ':' || slctdStr == '/' || slctdStr == '-'){
                paragraph += slctdStr;
            }
            else {
                paragraph += " " + slctdStr;
            }
        }
        paragraph += "\n";
    }

    console.log(paragraph);

    res.json({
        data: paragraph
    });
});
