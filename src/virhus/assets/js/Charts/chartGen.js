


var TICKINTERVAL = 1000
var XAXISRANGE = 4 * TICKINTERVAL
var speed = 1000/TICKINTERVAL;
var obj = { x: 0 }
var range = {
  min: -2,
  max: 2,
}



// Append new sample.
function append(series,buffer) {
  let now = Date.now();
  let data = buffer.shift().split(",")
  console.log(data)
  for (let i = 0; i < 4; i++) {
      //let value = Math.random() * (range.max - range.min) + range.min;
      // The append method takes a timestamp and a value.
      series[i].append(now, parseFloat(data[i]));
  }
 
}

// Append new sample.
function zero(series) {
  let now = Date.now();
  for (let i = 0; i < 4; i++) {
      
      // The append method takes a timestamp and a value.
      series[i].append(now, 0);
     
  }
 
}

function downloadData(buffer,emotion,size,offset){
  data = `{"Emotion":"`+emotion+`","Size":`+size+`,"Offset":`+offset+`}`
  $.post("/getData",data,function(result){
    //console.log(JSON.parse(result))
    buffer.push(...JSON.parse(result))
  });
   
 
}

function getNewSeries(data, newData, baseval) {
 
  var newDate = baseval + TICKINTERVAL;

  
  if(data.length >XAXISRANGE){
    data[data.length - XAXISRANGE].y = obj.x;
   
  } 
  data.push.apply(data,newData.splice(0,TICKINTERVAL/2))
  
}
function newValue(yrange) {
  return Math.random() * (yrange.max - yrange.min) + yrange.min;
}