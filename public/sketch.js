console.log("loinkes")

var song, analyzer;
var c;
var db;
var d;
var eb;
var e;
var f;
var gb;
var g;
var ab;
var a
var bb;
var b;
var ch;
var fft;
var vol;
var freq;
var en;
var fcount;
var w;
var columns;
var rows;
var next;
var h;
var currentSelection = {}

//loading all the sound files to be useable in the draw function, then inserting it into the codes object
function preload() {
  c = loadSound('scale/C.mp3');
  db = loadSound('scale/Db.mp3');
  d = loadSound('scale/D.mp3');
  eb = loadSound('scale/Eb.mp3');
  e = loadSound('scale/E.mp3');
  f = loadSound('scale/F.mp3');
  gb = loadSound('scale/Gb.mp3');
  g = loadSound('scale/G.mp3');
  ab = loadSound('scale/Ab.mp3');
  a = loadSound('scale/A.mp3');
  bb = loadSound('scale/Bb.mp3');
  b = loadSound('scale/B.mp3');
  ch = loadSound('scale/Ch.mp3');

  codes[65]["note"] = c;
  codes[87]["note"] = db;
  codes[83]["note"] = d;
  codes[69]["note"] = eb;
  codes[68]["note"] = e;
  codes[70]["note"] = f;
  codes[84]["note"] = gb;
  codes[71]["note"] = g;
  codes[89]["note"] = ab;
  codes[72]["note"] = a;
  codes[85]["note"] = bb;
  codes[74]["note"] = b;
  codes[75]["note"] = ch;


}

//drawing the grid to setup "game of life" and setting up variable to analyze sound output
function setup() {
  createCanvas(windowWidth, windowWidth);
  h = height/2
  w = 40
  columns = floor(width/w);
  rows = floor(height/w);
  board = new Array(columns);
  for(var i = 0; i < board.length; i++){
    board[i] = new Array(rows);
  }
  next = new Array(columns);
  for(var i = 0; i < next.length; i++){
    next[i] = new Array(rows)
  }

  analyzer = new p5.Amplitude();

  init()
}

function draw() {
  background(255);
  // Get the overall volume (between 0 and 1.0)
  generate();
  // console.log("rgba(" + Math.abs(255 - colors.red) + "," +  Math.abs(255 - colors.green) + "," +  Math.abs(255 - colors.blue) + ", 0.25)")
  for(var i = 0; i < columns; i++){
    for(var j = 0; j < rows; j++){
      if(board[i][j] == 1){
        fill("rgba(" + Math.abs(255 - colors.red) + "," +  Math.abs(255 - colors.green) + "," +  Math.abs(255 - colors.blue) + ", 0.45)");
      } else {
        fill(255)
      }
        noStroke();
        ellipse(i*w,j*w,w-1,w-1)
    }
  }

  vol = analyzer.getLevel();

  fcount += 1 //this is to delay to volume interpretor so that the values can stick to t array

      if(vol < .02 && fcount > 20){
        currentSelection = {}
        colors = {
          "red":80,
          "green": 80,
          "blue": 115
        }
      }
  //create main shape
  mainShape()

  //create expansion of shape
  expandedShape()

  combo()

}

//displaying default hard-coded shape for single note
function singleNote(){
  var vertices = []
  var size = 2;
  //making some array rearraingments to split up vert array per currentSelection into 2, so that each pair can be used as a new vertex
  for(x in currentSelection){
    var temp = currentSelection[x].vert
    var values = []
    temp.forEach(function(x){
      values.push(x)
    })
    while(values.length > 0){
      vertices.push(values.splice(0,size))
    }
    }
    //using the newly made array, and turning each array into a vertex to make a complete shape
      beginShape()
        vertices.forEach(function(x){
          vertex(h+(h*x[0]*vol*2), h+(h*x[1]*vol*2))

        })

      endShape(CLOSE)

}

function mainShape(){
  fill("rgba(" + colors.red + "," + colors.green + "," + colors.blue + "," + vol * 3 + ")")
  noStroke()
  if(Object.keys(currentSelection).length === 1){
    singleNote()
  } else {
    beginShape();
      for(x in currentSelection){
          var sel = currentSelection[x]
          vertex(h+(h*sel["vert"][0]*vol*2), h+(h*sel["vert"][1]*vol*2))
          bezierVertex(h+(h*sel["vert"][2]*vol*2),h+(h*sel["vert"][3]*vol*2),
          h+(h*sel["vert"][4]*vol*2),h+(h*sel["vert"][5]*vol*2),
          h*sel["vert"][6],h*sel["vert"][7])
      }
    endShape(CLOSE);
  }
}

//this is the outline of that shape that grows out as the volume diminishes
function expandedShape(){
  if(Object.keys(currentSelection).length > 2){
    noFill()
    stroke("rgba(" + colors.red + "," + colors.green + "," + colors.blue + "," + vol + ")")
    strokeWeight(3)
    beginShape();
      for(x in currentSelection){
          var sel = currentSelection[x]
          vertex(h+(h*sel["vert"][0]*(fcount/4)), h+(h*sel["vert"][1]*(fcount/4)))
          bezierVertex(h+(h*sel["vert"][2]*(fcount/4)),h+(h*sel["vert"][3]*(fcount/4)),
          h+(h*sel["vert"][4]*(fcount/4)),h+(h*sel["vert"][5]*(fcount/4)),
          h*sel["vert"][6],h*sel["vert"][7])
      }
    endShape(CLOSE);
  }
}

function keyPressed(){
  for(var key in codes){
    if(keyCode == key){
      if(codes[key].color === "red" && colors.red < 255){
        colors.red += 35
      } else if(codes[key].color === "blue" && colors.blue < 255){
        colors.blue += 35
      } else if(codes[key].color === "green" && colors.green < 255){
        colors.green += 35
      }
      fcount = 0
      if(!currentSelection[key]){
        currentSelection[key] = codes[key]
      }
      //uncomment this to have all notes in currentSelection played per keypress. else, play only the key pressed
      // for(x in currentSelection){
      //   currentSelection[x].note.play()
      // }
      codes[key].note.play()
    }
  }
}

//this function initializes the "game of life"
function init(){
  for(var i = 0; i < columns; i++){
    for(var j = 0; j < rows; j++){
      if(i == 0 || j == 0 || i == columns-1 || j == rows-1){
        board[i][j] = 0
      } else {
        board[i][j] = floor(random(2))
        next[i][j] = 0
      }
    }
  }
}

//notes the different states of the game of life, switches on init
function generate(){
  for(var x = 1; x < columns - 1; x++){
    for(var y = 0; y < rows - 1; y++){
      var neighbors = 0;
      for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++){
          neighbors += board[x+i][y+j]
        }
      }
      neighbors -= board[x][y];

      if((board[x][y] == 1) && (neighbors < 2)){
        next[x][y] = 0;
      } else if((board[x][y] == 1) && (neighbors > 3)){
        next[x][y] = 0;
      } else if((board[x][y] == 0) && (neighbors == 3)){
        next[x][y] = 1;
      } else {
        next[x][y] = board[x][y]
      }
    }
  }
  var temp = board;
  board = next;
  next = temp;
}


//this function searches in the combos object to see if the currentSelection matches any of them. and if they do, visual orgasm.
function combo(){
  for(k in combos){
    // debugger
    if(Object.keys(currentSelection).sort().join() === combos[k]["keys"].sort().join()){
      init()
      combos[k].change()
      // debugger
    }
  }

}
