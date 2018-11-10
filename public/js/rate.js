var rateInput = document.getElementById('rating-input');
const rateForm = document.getElementById('rating-form').addEventListener('submit', event => {
    event.preventDefault();
    ajaxRate(rateInput.value);
});

function ajaxRate(value) {

    const ajaxUrl = '/rating';

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

var commentInput = document.getElementById('comment-input');
var postId = document.getElementById('postId-input');
var userId = document.getElementById('userId-input');
const commentForm = document.getElementById('comment-form').addEventListener('submit', event => {
    event.preventDefault();
    ajaxComment(commentInput.value, postId.value, userId.value);
});

function ajaxComment(comment, postId, userId) {

    const ajaxUrl = '/comment';

    var request = new XMLHttpRequest();

    function responseHandler() {
        var comment = JSON.parse(this.responseText);
        addComment(comment);
        commentInput.value = null;
    }

    function addComment(comment) {
        var container = document.getElementById('allComments');
        var newComment = document.createElement('div');
        var commentDetails = document.createElement('p');
        commentDetails.classList.add('d-inline-block', 'my-1', 'mr-2');
        var detailLink = document.createElement('a');
        detailLink.setAttribute('href', `/users/${comment.user_id}`);
        detailLink.innerHTML = comment.username + ' - ' + comment.dt_simplified;
        commentDetails.appendChild(detailLink);
        var commentMessage = document.createElement('p');
        commentMessage.classList.add('d-inline-block', 'my-1', 'neon-green', 'specific-comment');
        commentMessage.innerHTML = comment.message;
        newComment.appendChild(commentDetails);
        newComment.appendChild(commentMessage);
        container.insertBefore(newComment, container.firstChild);
    }

    request.addEventListener('load', responseHandler);

    request.open('POST', ajaxUrl ,true);

    request.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );

    const comments = {
        message: comment,
        post_id: postId,
        user_id: userId,
    }

    request.send(`comment=${JSON.stringify(comments)}`);

}














