class User {
    constructor(name, email, userName, password) {
        this.name = name;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }
}

function register() {
    var newUser = new User(document.getElementById("nameInput").value, document.getElementById("mailInput").value,
                           document.getElementById("userNameInput").value, document.getElementById("passwordInput").value);
    return newUser;
}

function showText() {
    var user = register();

    document.getElementById("outputBox").textContent =  "Name: " + user.name + "\n mail: " + user.email + 
                                                        "\n User Name: " + user.userName + "\n Password: " + user.password;
}