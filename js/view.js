const view = {}
let app = document.getElementById('app')
view.setActiveScreen = (screenName) => {
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
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email
                }
                const botMsg = {
                    content: sendMessageForm.message.value,
                    owner: 'bot'
                }
                view.addMessage(message)
                view.addMessage(botMsg)
                sendMessageForm.message.value = ''
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
    }
}


const logOut = () => {
    const confirm = confirm('Do you want to log out')
    if (confirm === true) {
      view.setActiveScreen('loginScreen')
  
    } else {
      view.setActiveScreen('chatScreen')
    }
  }

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    if (message.owner === model.currentUser.email){
        messageWrapper.classList.add('mine')
        if (message.content.trim() != "") {
            messageWrapper.innerHTML = `
                <div class="content">
                    ${message.content}
                </div>
            `
        }
    }else {
        messageWrapper.classList.add('their')
        if (message.content.trim() != "") {
            messageWrapper.innerHTML = `
                <div class = "owner">
                    ${message.owner}
                </div>
                <div class = "content">
                    ${message.content}
                </div>
            `
        }
    }
    document.querySelector('.list-messages').appendChild(messageWrapper)
}