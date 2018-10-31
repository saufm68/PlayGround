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
var dt = document.getElementById('dt-input');
const commentForm = document.getElementById('comment-form').addEventListener('submit', event => {
    event.preventDefault();
    ajaxComment(commentInput.value, postId.value, userId.value, dt.value);
});

function ajaxComment(comment, postId, userId, dt) {

    const ajaxUrl = '/comment';

    var request = new XMLHttpRequest();

    function responseHandler() {
        var comment = JSON.parse(this.responseText);
        addComment(comment);
        commentInput.value = null;
    }

    function addComment(comment) {
        console.log(comment)
        var container = document.getElementById('allComments');
        var newComment = document.createElement('div');
        newComment.classList.add('specific-comment')
        var top = document.createElement('div')
        var username = document.createElement('h3');
        username.classList.add('comment-header','left');
        var userNameLink = document.createElement('a')
        userNameLink.setAttribute('href', `/users/${comment.user_id}`);
        userNameLink.innerHTML = comment.username;
        username.appendChild(userNameLink);
        var dt = document.createElement('h3');
        dt.classList.add('comment-header','right');
        dt.innerHTML = comment.dt;
        top.appendChild(username);
        top.appendChild(dt);
        var bottom = document.createElement('p');
        bottom.classList.add('comment-body');
        bottom.innerHTML = comment.message;
        newComment.appendChild(top);
        newComment.appendChild(bottom);
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
        dt: dt
    }

    request.send(`comment=${JSON.stringify(comments)}`);

}














