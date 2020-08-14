
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
    // firestoreFuntion()
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        if (user.emailVerified) {
          model.currentUser = {
            displayName: user.displayName,
            email: user.email
          }
          view.setActiveScreen('chatScreen')
        }else {
          view.setActiveScreen('loginScreen')
          alert('please verify your email')
        }
      }else {
        view.setActiveScreen('loginScreen')
      }
    })
}

window.onload = init

firestoreFuntion = async () => {
  //get one document
  const documentId = 'IqnDNB11rBweD2TY05qi'
  const response = await firebase.firestore().collection('users').doc(documentId).get()
  const user = getDataFromDoc(response)
  // console.log(user)
  //get many document
  const response2 = await firebase.firestore().collection('users').where('address','==','ha noi').get()
  // console.log(response2)
  // console.log(getDataFromDoc(response2.docs[1]))
  console.log(response2.docs)
  const listUser = getDataFromDocs(response2.docs)
  console.log(listUser)
  
  //add document
  const userToAdd = {
    name: 'abc',
    age: 45,
    email: 'fdsfds@gmail.com',
    // phoneNumber: firebase.firestore.FieldValue.arrayUnion('094')
  }
  // firebase.firestore().collection('users').add(userToAdd)

  //update document
  documentIdUpdate = 'lvRR2RwXqzbr3r3oAVPk'
  const dataToUpdate = {
    name: 'fsdfdsfdsfds',
    phoneNumber: firebase.firestore.FieldValue.arrayUnion('094')

  }
  firebase.firestore().collection('users').doc(documentIdUpdate).update(dataToUpdate)
  //delete document
  const docToDelete = 'iuixJcaR2jk3T4Umj2j3'
  firebase.firestore().collection('users').doc(docToDelete).delete
}

getDataFromDoc = (doc) => {
  const data = doc.data()
  data.id = doc.id
  return data
}
getDataFromDocs = (docs) => {
  const listData = docs.map(item => getDataFromDoc(item))
  return listData
}