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

function updateInfoboxContent(){
  // update infobox content if it has an infobox
  if ( currentSlide.getElementsByClassName("infobox").length) {
    document.getElementById("modalInner").innerHTML = currentSlide.getElementsByClassName("infobox")[0].innerHTML
  }
}

// Modal stuff
var modal = document.getElementById("infobox")
var modalInner = document.getElementById("modalInner");
var infoboxbutton = document.getElementById("infoboxbutton");
var backbutton  = document.getElementById("back-button");
var span = document.getElementsByClassName("close")[0];
infoboxbutton.onclick = function() {
  event.preventDefault();
  modal.style.display = "flex";
  updateInfoboxContent();
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
  if (typeof event.previousSlide !== 'undefined') {
    // there is a previous slide
    backbutton.style.display="flex"
  }else{
    // there is no prev slide
    backbutton.style.display="none"
  }
  
  if ( event.currentSlide.getElementsByClassName("infobox").length  ) {
    infoboxbutton.style.display="flex"
    modalInner.innerHTML=event.currentSlide.getElementsByClassName("infobox")[0].innerHTML
  }else{
    infoboxbutton.style.display="none"
  }
} );

//set current slide 
Reveal.on('ready', event =>{
  currentSlide = event.currentSlide;
})

let currentSlide;