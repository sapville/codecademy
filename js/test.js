class Output {
  constructor(text) {
    this.text = text;
  }
  show() {
    $("#output").append(`<p>${this.text}</p>`);  
    
  }
}

function someFunction() {
  
  new Output("Something").show();
  new Output("Something Else").show();
   
}