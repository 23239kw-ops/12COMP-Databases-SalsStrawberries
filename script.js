
console.log("Running Sal's Strawberries")
firebase.database().ref('/').set(
    {
    salsFruits: {
      users: {},
    }
}
)

function writeForm(){
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

function fb_write() {
    // Get the form data
    const name =
    document.getElementById("name").value;

    const favoriteFruit =
    document.getElementById("favoriteFruit").value;

    const fruitQuantity =
    document.getElementById("fruitQuantity").value;

    console.log('Users name is ' + name +
        '. Their favourite fruit is ' + favoriteFruit +
    '. They want ' + fruitQuantity + ' servings per week.')
    //let userID = _user.uid;
        //console.log(userID);
    firebase.database().ref("fruitForms/" + name).set({

    name: name,
    favoriteFruit: favoriteFruit,
    fruitQuantity: fruitQuantity,
  });
}