if(document.location.hash === '#unauthorized') {
    document.write('<div class="form-check-label">Invalid Username or Password</div>');
    const alertDOM = document.getElementById("Alert")
    alertDOM.innerText = 'Parola sau User incorect!'
    alertDOM.style.color = 'rgba(255, 120, 0, 1)'
} else if(document.location.hash === '#error') {
    const alertDOM = document.getElementById("Alert")
    alertDOM.innerText = 'An unexpected Error has occured!'
    alertDOM.style.color = 'rgba(255, 0, 0, 1)'
}

function updateSpanText() {
var userField = document.getElementById("username")
var userSpan = document.getElementById("userSpan")
var UserVal = userField.value;
if (UserVal == '') {
    UserVal = ' '
}
userSpan.innerText = `'${UserVal}'`
}

function updatePassText() {
var PassField = document.getElementById("password")
var PassSpan = document.getElementById("PassSpan")
var PassVal = PassField.value;
if (PassVal == '') {
    PassVal = ' '
}
PassSpan.innerText = `'${PassVal}'`
}