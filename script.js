
console.log("Running Sal's Strawberries")

function writeForm(){
    // Get the form data
    const favoriteFruit = document.getElementById("favoriteFruit").value;
}
firebase.database().ref('users/').set();
let users = Object.keys()
function fb_write(){
    
}

//google login
var GLOBAL_user;

function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;
    console.log("User has logged in")
  });
}
function fb_login() {
    firebase.auth().onAuthStateChanged(LOGIN_CALLBACK);
}
function fb_handleLogin(_user) {
    if (_user) {
        console.log("User is logged in")
        GLOBAL_user = _user;

    } else {
        console.log("User is NOT logged in - Starting the popup process")
        fb_popupLogin();
    }
}
//google login/