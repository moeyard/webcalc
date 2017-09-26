var express = require('express');
var bodyParser = require('body-parser')
var app = express();


app.use( bodyParser.json());
app.use('/key' , (req,res, next) =>{
  res.send({value:req.body.value});
});

app.listen(3000 , ()=>{

});
