const view = {}
let app = document.getElementById('app')
view.setActiveScreen = (screenName, formCreateConversation = false) => {
    switch (screenName) {
        case 'welcomeScreen' :
            document.getElementById('app').innerHTML = components.welcomeScreen
        break;

        case 'registerScreen' :
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                console.log(data);
                controller.register(data)
            })
            
            const redirectToLogin = document.getElementById('redirect-to-login')
            redirectToLogin.addEventListener('click', () => {
                view.setActiveScreen('loginScreen')
            })
        break;

        case 'loginScreen' :
            document.getElementById('app').innerHTML = components.loginScreen
            document.getElementById('redirect-to-register').addEventListener('click', () => {
                view.setActiveScreen('registerScreen')
            })
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                loginForm.email.value = loginForm.email.value.trim()
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(data)
            })
        break;
        case 'chatScreen' :
            document.getElementById('app').innerHTML = components.chatScreen
            const sendMessageForm = document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                if (sendMessageForm.message.value.trim() !== '' ){
                    const message = {
                        content: sendMessageForm.message.value,
                        owner: model.currentUser.email,
                        createAt: (new Date()).toISOString()
                    }
                    model.addMessage(message)
                    sendMessageForm.message.value = ''

                    // //send message to firestore
                    // firebase.firestore().collection('users').add(message)
                    // firebase.firestore().collection('users').add(botMsg)
                }

            })
            if(!formCreateConversation){
                model.loadConversations()
                model.listenConversationsChange()
            }else {
                view.showCurrentConversation()
                view.showConversation()
            }
            document.querySelector('.create-conversation .btn').addEventListener('click', () => {
                view.setActiveScreen('createConversation')
            })        

            document.getElementById("log-out").addEventListener("click", (e) => {
                e.preventDefault()
                firebase.auth().signOut().then(() => {
                    view.setActiveScreen('loginScreen')
                  }).catch(function (error) {
                    //An error happened
                  })
              })
        break;
        case 'createConversation':
            document.getElementById('app').innerHTML = components.createConversation
            document.querySelector('#back-to-chat').addEventListener('click', () => {
                view.setActiveScreen('chatScreen', true)
            })
            const createConversationForm = document.getElementById('create-conversation-form')
            createConversationForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = {
                    title: createConversationForm.conversationTitle.value,
                    email: createConversationForm.conversationEmail.value
                }
                controller.createConversation(data)
                view.setActiveScreen('chatScreen', true)
            })
        break;
    }
}


view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    if (message.owner === model.currentUser.email){
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
                <div class="content">
                    ${message.content}
                </div>
            `
    }else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
                <div class = "owner">
                    ${message.owner}
                </div>
                <div class = "content">
                    ${message.content}
                </div>
            `
    }
    document.querySelector('.list-messages').appendChild(messageWrapper)
}

view.showCurrentConversation = () => {
    document.querySelector('.list-conversation').innerHTML =''
    // console.log(model.currentConversation)
    // doi ten cac cuoc tro chuyen
    document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title
    //in cac tin nhan len man hinh
    for(message of model.currentConversation.messages){
        view.addMessage(message)
    }
    view.scrollToEndElement()
}

view.scrollToEndElement = () => {
    const element = document.querySelector('.list-messages')
    element.scrollTop = element.scrollHeight
}

view.showConversation = () => {
    for( oneConversation of model.conversations) {
        view.addConversation(oneConversation)
    }
}

view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    // conversationWrapper.classList.add(['conversation', 'cursor-pointer'])
    conversationWrapper.className = 'conversation cursor-pointer'
    if(model.currentConversation.id === conversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
        <div class="conversation-title">${conversation.title}</div>
        <div class="conversation-num-user">${conversation.users.length} users</div>
    `
    conversationWrapper.addEventListener('click', () => {
        // thay doi giao dien, doi current
        document.querySelector('.current').classList.remove('current')
        conversationWrapper.classList.add('current')
        // thay doi model.currentConversaion
        model.currentConversation = conversation
        // in cac tin nhan cua model.currentConversation len man hinh
        view.showCurrentConversation()
    })
    document.querySelector('.list-conversation').appendChild(conversationWrapper)
}