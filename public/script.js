$(document).ready(function(){
    console.log("scrtip loinked")
    var content = ["Hi", "Sounds, colors and shapes here", "All within a chromatic octave beginning in C", "Try pressing a key from left to right, A to K","OoOoO sounds...","OOooOo colors...","OoOoOO shapes...", "Look around for the sharps and flats","Now try a C major chord", "*hint* 'A', 'D', 'G' or 'A', 'D', 'G', 'K' *hint*", "Click '>'' and go crazy with different chords!"]
    var msg = 0
    $("#wrapper")[0].textContent = content[msg]

    $("#next").click(function(e){
      if(msg < content.length - 1){

        msg += 1
        $("#wrapper")[0].textContent = content[msg]
        console.log("works?")
      }  else if(msg === content.length - 1){
        $("#container").hide()
      }
    })

    $("#prev").click(function(e){
      if(msg > 0){

        msg -= 1
        $("#wrapper")[0].textContent = content[msg]
        console.log("works?")
      }
    })
    // $("body").click(function(e){
    //   $("#lookie").hide()
    // })
    $("#info").click(function(e){
      msg = 0
      $("#wrapper")[0].textContent = content[msg]
      $("#container").show()
    })
    function show_popup()
    {
      document.getElementById('container').style.display = 'block';
    }

    window.onload = $("#container").show();

})
