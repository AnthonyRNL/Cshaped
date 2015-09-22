var Key = function(id,color,vert){
  this.id = id;
  this.color = color;
  this.vert = vert;
  this.vert1 = vert[0];
  this.vert2 = vert[1];
  this.bez1 = vert[2];
  this.bez2 = vert[3];
  this.bez3 = vert[4];
  this.bez4 = vert[5];
  this.bez5 = vert[6];
  this.bez6 = vert[7];
}

//change shape by already having 12 points, and you're just manipulating vectors
var codes = {
  65: new Key(1,"red",[-1,-1,1,-1,1,1,-1,1]),//a
  87: new Key(2,"blue",[-1,-1,1,-1,0,1]),//w
  83: new Key(3,"green",[1,1,1,-1,-1,1,1,1]),//s
  69: new Key(4,"blue",[1,1,0,1,0.5,0.5,1,1]),//e
  68: new Key(5,"green",[0,1,1,0,0.5,-1,-0.5,-1,-1,0]),//d
  70: new Key(6,"red",[0,-1,1,-1,0,1,-1,1]),//f
  84: new Key(7,"blue",[1,-1,-1,1,-1,-1,1,1]),//t
  71: new Key(8,"red",[-2,-1,2,-1,2,1,-2,1]),//g
  89: new Key(9,"blue",[-1.5,0,-1,-1,0,-1.5,1,-1,1.5,0,1,1,0,1.5,-1,1]),//y
  72: new Key(10,"green",[1,-1,-1,1,-1,-1,1,1]),//h
  85: new Key(11,"blue",[0,0,0.5,-1,-0.5,-1,1,1]),//u
  74: new Key(12,"green",[0,2,1,0,0,-2,-1,0]),//j
  75: new Key(13,"red",[-2,-2,2,-2,0.5,1,-0.5,1])//k
}
// var codes = {
//   65: new Key("red",[1,1,-1,-1,1,-1,1,1]),
//   87: new Key("blue",[-1,0,1,-1,0,-1,1,1]),
//   83: new Key("green",[1,1,1,-1,-1,1,1,1]),
//   69: new Key("red",[1,1,0,1,0.5,0.5,1,1]),
//   68: new Key("green",[1,-1,-1,1,-1,-1,1,1]),
//   70: {},
//   84: {},
//   71: new Key("red",[-1,1,1,-1,1,1,1,1]),
//   89: {},
//   72: {},
//   85: {},
//   74: {},
//   75: new Key("green",[-1,-1,1,1,-1,1,1,1])
// }

var combos = {
  "major/c": {
    "keys": [65,68,71,75],
    change: function(){
      currentSelection[65]["vert"] = [-1,0,1,-1,1,-1,1,1];
      currentSelection[68]["vert"] = [1,0,-1,-1,-1,-1,1,1];
      currentSelection[71]["vert"] = [-1,0,1,1,1,1,1,1];
      currentSelection[75]["vert"] = [1,0,-1,1,-1,1,1,1]
    }
  },
  "minor/c": {
    "keys": [65,69,71,75],
    change: function(){
      currentSelection[65]["vert"] = [-1,0,1,-1,0,-1,1,1];
      currentSelection[69]["vert"] = [1,0,-1,-1,0,-1,1,1];
      currentSelection[71]["vert"] = [-1,0,1,1,0,1,1,1];
      currentSelection[75]["vert"] = [1,0,-1,1,0,1,1,1]
    }
  },
  "a-minor": {
    "keys": [83,70,72,75],
    change: function(){
      currentSelection[83]["vert"] = [1,1,-1,-1,1,-1,1,1];
      currentSelection[70]["vert"] = [1,-1,-1,1,-1,-1,1,1];
      currentSelection[72]["vert"] = [-1,1,1,-1,1,1,1,1];
      currentSelection[75]["vert"] = [-1,-1,1,1,-1,1,1,1]
    }
  },
  "pentatonic": {
    "keys": [65,83,68,71,72],
    change: function(){
      currentSelection[65]["vert"] = [0,-1,-0.5,0,0.5,0,-1,1];
      currentSelection[83]["vert"] = [1,0,0,-1,0,1,2,1];
      currentSelection[68]["vert"] = [0.5,1,0.5,0,-0.5,1,1.5,2];
      currentSelection[71]["vert"] = [-0.5,1,0.5,1,-0.5,1,-0.5,2];
      currentSelection[72]["vert"] = [-1,0,0,1,0,-1,-1,1];
    }
  },
  "minor": {
    "keys": [65,69,71],
    change: function(){
      currentSelection[65]["vert"] = [1,0,-1,-0.5,-1,-1,1,1];
      currentSelection[69]["vert"] = [1,0,-1,0.5,-1,1,1,1];
      currentSelection[71]["vert"] = [0,0,-1,-1,-1,1,1,1];
    }
  },
  "major": {
    "keys": [65,68,71],
    change: function(){
      currentSelection[65]["vert"] = [0,0,0.5,-1,-0.5,-1,1,1];
      currentSelection[68]["vert"] = [0,0,-0.5,1,-1,0,1,1];
      currentSelection[71]["vert"] = [0,0,1,0,0.5,1,1,1];
    }
  }
}


//there are 12 possible combinations for intervals that are a single semitone apartx

var colors = {
  "red":80,
  "green": 80,
  "blue": 115
}
