const model = {}
model.currentUser = undefined
model.conversations = undefined
model.currentConversations = undefined
model.collectionName = 'conversations'

model.register = (data) => {
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then((res) => {
        firebase.auth().currentUser.updateProfile({
            displayName : data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        alert('the email has been registered, please check your email')
        view.setActiveScreen('loginScreen')
    }).catch((err) => {
        console.log(err)
        alert(err.message)
    })
}

model.login = async (dataLogin) => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
        // console.log(response)
        // if(!response.user.emailVerified){
        //     alert('verify email')
        // }else {
        //     model.currentUser = {
        //         displayName: response.user.displayName,
        //         email: response.user.email
        //     }
        //     view.setActiveScreen('chatScreen')
        // }
    }catch(err) {
        console.log(err)
        alert(err.message)
    }
}

model.chat = async () => {
    try {
      const authState = await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          if (user.emailVerified) {
            model.currentUser = {
              displayName: user.displayName,
              email: user.email
            }
            view.setActiveScreen('chatScreen')
          } else {
            view.setActiveScreen('loginScreen')
            alert('Please verify your email')
          }
        } else {
          view.setActiveScreen('loginScreen')
        }
      });
  
    } catch (error) {
      alert(error.message)
  
    }
}

model.addMessage = (message) => {
  const dataToUpdate = {
    messages : firebase.firestore.FieldValue.arrayUnion(message)
  }
  firebase.firestore().collection(model.collectionName).doc('vm7BU3JMvuENFYH1LMNh').update(dataToUpdate)
}

model.loadConversations = async () => {
  const response = await firebase.firestore().collection(model.collectionName).where('users','array-contains',model.currentUser.email).get()
  model.conversations = getDataFromDocs(response.docs)
  // console.log(getDataFromDocs(response.docs))
  if( model.conversations.length > 0){
    model.currentConversation = model.conversations[0]
    view.showCurrentConversation()
  }
  view.showConversation()

}

model.listenConversationsChange = () => {
  let isFirstRun = true
  firebase.firestore().collection(model.collectionName).where('users','array-contains',model.currentUser.email).onSnapshot((res) => {
    if(isFirstRun) {
      isFirstRun = false
      return
    }
    const docChanges = res.docChanges()
    // console.log(docChanges)
    for (oneChange of docChanges) {
      // console.log(oneChange);
      const type = oneChange.type
      if ( type === 'modified'){
        const docData = getDataFromDoc(oneChange.doc)
        // update lai model.conversations
        for (let index = 0; index < model.conversations.length; index++) {
          if (model.conversations[index].id === docData.id) {
            model.conversations[index] = docData
          }
        }
        if (docData.id === model.currentConversation.id) {
          model.currentConversation = docData
          const lastMessage = docData.messages[docData.messages.length - 1]
          view.addMessage(lastMessage)
          view.scrollToEndElement()
        }
      }
    }
  })
}

model.saveNewConversation = (data) => {
  firebase.firestore().collection('conversations').add(data)
}