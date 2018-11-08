 var input = document.getElementById('pic');
 input.addEventListener('change', handleFile);

function handleFile() {

    file = this.files[0];

    var preview = document.getElementById('initial-pic');
    var label = document.getElementById('fileLabel');
    label.innerHTML = file.name;
    preview.file = file;
    var reader = new FileReader();
    reader.onload = (function(aImg) {
        return function(e) {
            aImg.src = e.target.result;
        };
    })(preview);

    reader.readAsDataURL(file);

};

if (document.getElementById('radio-container')) {
    var optionPro = document.getElementById('pro-container');
    var radioPro = document.getElementById('pro-radio');
    var optionAma = document.getElementById('amatuer-container');
    var radioAma = document.getElementById('amatuer-radio');

    optionPro.addEventListener('click', () => {

        optionPro.childNodes[0].style.backgroundColor = "#00ff7f";
        optionPro.childNodes[0].style.color = "black";
        optionPro.childNodes[0].style.border = "2px solid black";
        optionPro.childNodes[1].style.backgroundColor = "#00ff7f";
        optionPro.childNodes[1].style.border = "2px solid black";
        optionPro.childNodes[1].childNodes[1].style.color = "black";
        radioPro.checked = true;

        optionAma.childNodes[0].style.backgroundColor = "black";
        optionAma.childNodes[0].style.color = "#00ff7f";
        optionAma.childNodes[0].style.border = "2px solid #00ff7f";
        optionAma.childNodes[1].style.backgroundColor = "black";
        optionAma.childNodes[1].style.border = "2px solid #00ff7f";
        optionAma.childNodes[1].childNodes[1].style.color = "#00ff7f";
        radioAma.checked = false;
    });

    optionAma.addEventListener('click', () => {

        optionAma.childNodes[0].style.backgroundColor = "#00ff7f";
        optionAma.childNodes[0].style.color = "black";
        optionAma.childNodes[0].style.border = "2px solid black";
        optionAma.childNodes[1].style.backgroundColor = "#00ff7f";
        optionAma.childNodes[1].style.border = "2px solid black";
        optionAma.childNodes[1].childNodes[1].style.color = "black";
        radioAma.checked = true;

        optionPro.childNodes[0].style.backgroundColor = "black";
        optionPro.childNodes[0].style.color = "#00ff7f";
        optionPro.childNodes[0].style.border = "2px solid #00ff7f";
        optionPro.childNodes[1].style.backgroundColor = "black";
        optionPro.childNodes[1].style.border = "2px solid #00ff7f";
        optionPro.childNodes[1].childNodes[1].style.color = "#00ff7f";
        radioPro.checked = false;
    });

}
