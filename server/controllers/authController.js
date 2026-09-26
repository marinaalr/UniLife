const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MongoUser = require("../models/MongoUser");

// Register a new user
const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingUsername = await MongoUser.findOne({
      username: username,
    });

    const existingEmail = await MongoUser.findOne({
      email: email,
    });

    if (existingUsername) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }

    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await MongoUser.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error.",
    });
  }
};

// Log in an existing user
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Username/email and password are required.",
      });
    }

    const user = await MongoUser.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid login details.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid login details.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture || "",
        university: user.university || "",
        program: user.program || "",
        yearOfStudy: user.yearOfStudy || "",
        bio: user.bio || "",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error.",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      profilePicture,
      university,
      program,
      yearOfStudy,
      bio,
    } = req.body;

    if (!name || !username || !email) {
      return res.status(400).json({
        message: "Name, username and email are required",
      });
    }

    const usernameTaken = await MongoUser.findOne({
      username: username,
      _id: { $ne: req.user.id },
    });

    const emailTaken = await MongoUser.findOne({
      email: email,
      _id: { $ne: req.user.id },
    });

    if (usernameTaken) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }

    if (emailTaken) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const updatedUser = await MongoUser.findByIdAndUpdate(
      req.user.id,
      {
        name,
        username,
        email,
        profilePicture,
        university,
        program,
        yearOfStudy,
        bio,
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Profile updated successfully.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        university: updatedUser.university,
        program: updatedUser.program,
        yearOfStudy: updatedUser.yearOfStudy,
        bio: updatedUser.bio,
      },
    });
  } catch {
    res.status(500).json({
      message: "Server error.",
    });
  }
};

const changeUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Please enter your current and new password.",
    });
  }
  const user = await MongoUser.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatch) {
    return res.status(400).json({
      message: "Current password is incorrect.",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "New password must be at least 6 characters.",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await MongoUser.findByIdAndUpdate(
    req.user.id,
    {
      password: hashedPassword,
    },
    {
      new: true,
    },
  );

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json({
    message: "Password changed successfully.",
  });
};

module.exports = {
  register,
  login,
  updateProfile,
  changeUserPassword,
};
