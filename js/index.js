
const init = () => {
  // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAcSnJqShtgK0SzAsAFdA2Cdw4HK_CrJ2U",
        authDomain: "chat-app-9a7bd.firebaseapp.com",
        databaseURL: "https://chat-app-9a7bd.firebaseio.com",
        projectId: "chat-app-9a7bd",
        storageBucket: "chat-app-9a7bd.appspot.com",
        messagingSenderId: "742054754357",
        appId: "1:742054754357:web:c4c2d82c470ada3aac197c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.app().name)
    console.log('window loaded')
    view.setActiveScreen('registerScreen')
}

window.onload = init