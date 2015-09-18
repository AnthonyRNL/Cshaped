
var Key = function(color,vert1,vert2,bez1,bez2,bez3,bez4,bez5,bez6){
  this.color = color;
  this.vert1 = vert1;
  this.vert2 = vert2;
  this.bez1 = bez1;
  this.bez2 = bez2;
  this.bez3 = bez3;
  this.bez4 = bez4;
  this.bez5 = bez5;
  this.bez6 = bez6;
}
var codes = {
  65: new Key("red",1,1,-1,-1,1,-1,1,1),
  87: new Key("blue",1,-0.5,-0.5,1,-1,0,1,1),
  83: new Key("green",1,1,1,-1,-1,1,2,0),
  69: new Key("red",1,1,0,1,0.5,0.5,2,0),
  68: new Key("green",1,-1,-1,1,-1,-1,1,1),
  70: {},
  84: {},
  71: new Key("red",-1,1,1,-1,1,1,1,1),
  89: {},
  72: {},
  85: {},
  74: {},
  75: new Key("green",-1,-1,1,1,-1,1,1,1)
}

var colors = {
  "red":80,
  "green": 80,
  "blue": 115
}
