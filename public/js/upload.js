var input = document.getElementById("pic");
input.addEventListener("change", handleFile);

function handleFile() {
  file = this.files[0];

  var preview = document.getElementById("initial-pic");
  var label = document.getElementById("fileLabel");
  label.innerHTML = file.name;
  preview.file = file;
  var reader = new FileReader();
  reader.onload = (function(aImg) {
    return function(e) {
      aImg.src = e.target.result;
    };
  })(preview);

  reader.readAsDataURL(file);
}
