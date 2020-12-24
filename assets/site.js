document.querySelector("#back-button").addEventListener("click",function(event){
    event.preventDefault();
    window.history.back();
});
//to close langchooser when language is selected
document.querySelector(".dropdown .langchooser").addEventListener("click", function(){
    document.querySelector("#checkbox_toggle").checked = false;
});

// to close langchooser when clicked on slide.
document.querySelector(".reveal").addEventListener("click", function(){
    document.querySelector("#checkbox_toggle").checked = false;
});


// Modal stuff
var modal = document.getElementById("infobox")
var modalInner = document.getElementById("modalInner");
var infoboxbutton = document.getElementById("infoboxbutton");
var span = document.getElementsByClassName("close")[0];
infoboxbutton.onclick = function() {
  modal.style.display = "block";
  console.log("clickie")
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 


Reveal.on( 'slidechanged', event => {
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  document.cs=event.currentSlide
  if ( event.currentSlide.getElementsByClassName("infobox").length  ) {
    console.log("slide has infobox")
    infoboxbutton.style.display="block"
    modalInner.innerHTML=event.currentSlide.getElementsByClassName("infobox")[0].innerHTML

  }else{
    console.log("slide has NO infobox")
    infoboxbutton.style.display="none"
  }
} );
