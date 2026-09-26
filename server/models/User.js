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

const findUserById = (id) => {
    const users = getUsers();

    return users.find(
        (user) => user.id === id
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
        email: userData.email,
        profilePicture: userData.profilePicture,
        university: userData.university,
        program: userData.program,
        yearOfStudy: userData.yearOfStudy,
        bio: userData.bio
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
        password: userData.password,
        profilePicture: userData.profilePicture || ""
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
};

//Change the user's password
const changePassword = (id, hashedPassword) => {
    const users = getUsers();

    const userIndex = users.findIndex(
        (user) => user.id === id
    );
    if (userIndex === -1) {
        return null;
    }

    users[userIndex].password = hashedPassword;

    saveUsers(users);

    return users[userIndex];
};

module.exports = {
    getUsers,
    findUser,
    findUserById,
    createUser,
    updateUser,
    changePassword
};