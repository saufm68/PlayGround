window.onload = () => {

    var logOut = document.getElementById('logout');
    if (document.getElementById('drop-down') !== null) {
        var dropDown = document.getElementById('drop-down').addEventListener('click', () => {

            if (logOut.style.visibility === 'visible') {
                logOut.style.visibility = 'hidden';
            } else {
                logOut.style.visibility = 'visible';
            }
        });
    }
};