$(document).ready(function(){

    console.log("scrtip loinked")
    var content = ["Hi", "Try a keys from left to right, A to K","OoOoO sounds...","OOooOo colors...","OoOoOO shapes...", "Now try a chord", "Click that danged 'o' button and go crazy"]
    var msg = 0
    $("#wrapper")[0].textContent = content[msg]

    $("#next").click(function(e){
      if(msg < content.length - 1){

        msg += 1
        $("#wrapper")[0].textContent = content[msg]
        console.log("works?")
      }
    })

    $("#prev").click(function(e){
      if(msg > 0){

        msg -= 1
        $("#wrapper")[0].textContent = content[msg]
        console.log("works?")
      }
    })

})
