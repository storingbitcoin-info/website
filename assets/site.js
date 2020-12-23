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