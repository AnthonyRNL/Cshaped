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

function preload() {
  // song = p5.Score(a,a,b,a)
  c = loadSound('scale/c.mp3');
  db = loadSound('scale/db.mp3');
  d = loadSound('scale/d.mp3');
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

  fill("rgba(" + colors.red + "," + colors.green + "," + colors.blue + "," + vol * 2 + ")")
  noStroke()
  beginShape();

  for(x in currentSelection){
      var sel = currentSelection[x]
      vertex(h+(h*sel["vert1"]*vol*2), h+(h*sel["vert2"]*vol*2))
      bezierVertex(h+(h*sel["bez1"]*vol*2),h+(h*sel["bez2"]*vol*2),h+(h*sel["bez3"]*vol*2),h+(h*sel["bez4"]*vol*2),h*sel["bez5"],h*sel["bez6"])
  }
  endShape(CLOSE);
  //this is for expansion of shape
  if(Object.keys(currentSelection).length > 2){
    console.log("hiii")
    noFill()
    stroke("rgba(" + colors.red + "," + colors.green + "," + colors.blue + "," + vol + ")")
    strokeWeight(5)
    beginShape();

    for(x in currentSelection){
        var sel = currentSelection[x]
        vertex(h+(h*sel["vert1"]*fcount), h+(h*sel["vert2"]*fcount))
        bezierVertex(h+(h*sel["bez1"]*fcount),h+(h*sel["bez2"]*fcount),h+(h*sel["bez3"]*fcount),h+(h*sel["bez4"]*fcount),h*sel["bez5"],h*sel["bez6"])
    }
    endShape(CLOSE);
  }
  combo()
}

function keyPressed(){
  for(var key in codes){
    if(keyCode == key){

      console.log(vol)
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
      for(x in currentSelection){
        currentSelection[x].note.play()
      }
    }
  }
      console.log(Object.keys(currentSelection).length)

}

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

function mousePressed(){
  init()
}

//this function searches in the combos object to see if the currentSelection matches any of them. and if they do, visual orgasm.
function combo(){
  for(k in combos){
    if(Object.keys(currentSelection).sort().join() === combos[k].sort().join()){
      init()
    }
  }

}
