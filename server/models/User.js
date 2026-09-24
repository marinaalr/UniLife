const fs = require("fs");
const path = require("path");

//path to the user data file
const usersFile = path.join(__dirname, "../data/users.json");

//read all users
const getUsers = () => {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
};

// Save all users
const saveUsers = (users) => {
    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );
};

//Find a user by username or email
const findUser = (identifier) => {
    const users = getUsers();

    return users.find(
        (user) =>
            user.username === identifier ||
            user.email === identifier
    );
};

const updateUser = (id, userData) => {
    const users = getUsers();

    const userIndex = users.findIndex(
        (user) => user.id === id
    );

    if (userIndex === -1) {
        return null;
    }

    users[userIndex] = {
        ...users[userIndex],
        name: userData.name,
        username: userData.username,
        email: userData.email
    };

    saveUsers(users);

    return users[userIndex];
};

// Create a new user
const createUser = (userData) => {
    const users = getUsers();

    const newUser = {
        id: Date.now(),
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
};

module.exports = {
    getUsers,
    findUser,
    createUser,
    updateUser
};