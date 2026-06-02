
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
  document.getElementById('statusMessage').innerHTML = `Form submitted!`
}

function fb_sendEmail() {

  let user = firebase.auth().currentUser;

  if (!user) {
    alert("Please log in first.");
    return;
  }

  // Get the name from the form
  const name = document.getElementById("name").value;

  firebase.database().ref("fruitForms/" + name)
    .once("value")
    .then((snapshot) => {

      const data = snapshot.val();

      if (!data) {
        alert("No form data found in database.");
        return;
      }

      // Get values from Firebase
      const email = user.email;
      const favoriteFruit = data.favoriteFruit;
      const fruitQuantity = data.fruitQuantity;

      document.getElementById('emailMessage').innerHTML = `

        <div>
          <p>To: ${email}</p>
          <p>From: Sal's Strawberry Saloon</p>

          <p>Hello, ${name}</p>

          <p>
            This is the fruit shop
          </p>

          <p>
            We are offering a deal on your favorite fruit:
            ${favoriteFruit}
          </p>

          <p>
            You can get ${fruitQuantity} servings per week.
          </p>

          <p>
            Best regards,<br>
            Fruits
          </p>
        </div>

      `;
    });
}