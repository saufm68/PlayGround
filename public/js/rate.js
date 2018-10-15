var rateInput = document.getElementById('rating-input');
const rateForm = document.getElementById('rating-form').addEventListener('submit', event => {
    event.preventDefault();
    ajaxPost(rateInput.value);
});

function ajaxPost(value) {

    var ajaxUrl = '/rating';

    var request = new XMLHttpRequest();

    function responseHandler() {
        const rating = JSON.parse(this.responseText);
        var avgScore = document.getElementById('score');
        avgScore.innerHTML = rating['avg'];
        var ratedBy = document.getElementById('ratedBy');
        ratedBy.innerHTML = parseInt(rating['count']);
        var ratingInput = document.getElementById('rating-input');
        ratingInput.value = null;
    };

    request.addEventListener('load', responseHandler);

    request.open('POST', ajaxUrl ,true);

    request.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );

    request.send(`value=${value}`);

};