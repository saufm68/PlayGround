window.onload = () => {

    var input = document.getElementById('pic');
    var uploadPic = document.getElementById('changePic').addEventListener('submit', event => {
        event.preventDefault();

        let files = input.files['0'];
        console.log(files)
        const formData = new FormData();
        formData.append('photo', files)

        upload(formData);
    });
};

function upload(formData) {

    const ajaxUrl = 'http://localhost:3000/games/new';

    const request = new XMLHttpRequest();
    console.log(formData.get('photo'));
    var responseHandler = function() {
      console.log("response text", this);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    }

    request.open('POST', ajaxUrl, true);
    request.upload = formData;
    request.setRequestHeader('Content-Type', File.type);

    request.addEventListener('load', responseHandler);

    request.send(formData);

};