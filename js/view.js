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
            document.getElementById('welcome-user').innerText = `welcome ${model.currentUser.displayName}`
        break;
    }
}