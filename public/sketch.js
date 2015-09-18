console.log("loinkes")
var song, analyzer;
// var h;
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
  h = windowHeight
  createCanvas(windowWidth, windowWidth);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();

  // Patch the input to an volume analyzer
  // analyzer.setInput(c);
  for(var key in codes){
    analyzer.setInput(codes[key]["note"])
    fft.setInput(codes[key]["note"])
  }




}

function draw() {
  background(255);
  // Get the overall volume (between 0 and 1.0)
  freq = fft.analyze()

  vol = analyzer.getLevel();
  var sel = 0;
  // console.log(en)
  // console.log(currentSelection)

  fcount += 1

    // if(currentSelection.length > 0){
    //   sel = currentSelection[0][1]

      if(vol < .02 && fcount > 20){
        currentSelection = {}
        colors = {
          "red":80,
          "green": 80,
          "blue": 115
        }
      }

  console.log(colors)
  fill("rgba(" + colors.red + "," + colors.green + "," + colors.blue + "," + vol * 2 + ")")
  noStroke()
  beginShape();

  // var w = width/2
  var h = height/2
  for(x in currentSelection){
      var sel = currentSelection[x]
      console.log(h*sel["bez1"]*vol*2)

      vertex(h+(h*sel["vert1"]*vol*2), h+(h*sel["vert2"]*vol*2))
      bezierVertex(h+(h*sel["bez1"]*vol*2),h+(h*sel["bez2"]*vol*2),h+(h*sel["bez3"]*vol*2),h+(h*sel["bez4"]*vol*2),h*sel["bez5"],h*sel["bez6"])
    // }


  }
endShape(CLOSE);


}

function keyPressed(){
  for(var key in codes){
    if(keyCode == key){

      console.log(currentSelection)
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
        // currentSelection.slice(-1).
      }
      for(x in currentSelection){
      // debugger
        currentSelection[x].note.play()
      }


    }
  }

}
