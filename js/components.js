const components = {}
components.welcomeScreen = `
<h1>Welcome to chat app</h1>
`

components.loginScreen =`
<div class="login-container">
        <div class="aside-right">
            <div class="header">
                <h3>MindX chat</h3>
            </div>
            <form id="login-form">
                <div class="input-wapper">
                    <input type="text" placeholder="Email..." name="email">
                    <div class="error" id="email-error"></div>
                </div>
                <div class="input-wapper">
                    <input type="text" placeholder="Password..." name="password">
                    <div class="error" id="password-error"></div>
                </div>
                <div class="form-action">
                <span class="cursor-pointer" id="redirect-to-register">Already have an account? Register</span>
                    <button class="btn" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
`

components.registerScreen = `
<div class="register-container">
        <div class="aside-right">
            <div class="header">
                <h3>MindX chat</h3>
            </div>
            <form id = "register-form">
                <div class="input-name-wapper">
                    <div class="input-wapper">
                        <input type="text" name="firstName" placeholder="First name">
                        <div class="error" id="first-name-error"></div>
                    </div>
                    <div class="input-wapper">
                        <input type="text" name="lastName" placeholder="Last name">
                        <div class="error" id="last-name-error"></div>
                    </div>
                </div>
                <div class="input-wapper">
                    <input type="text" name="email" placeholder="Email">
                    <div class="error" id="email-error"></div>
                </div>
                <div class="input-wapper">
                    <input type="password" name="password" placeholder="Password">
                    <div class="error" id="password-error"></div>
                </div>
                <div class="input-wapper">
                    <input type="password" name="confirmPassword" placeholder="Confirm Password">
                    <div class="error" id="confirm-password-error"></div>
                </div>
                <div class="form-action">
                <span class="cursor-pointer" id="redirect-to-login">Already have an account? Login</span>
                    <button class="btn" type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
`

components.chatScreen = `
<div id="welcome-user"></div>
`
