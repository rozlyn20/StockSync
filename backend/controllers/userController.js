const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const user = await userService.createUser(
      name,
      email,
      password,
      role
    );

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const user = await userService.updateUser(
      req.params.id,
      name,
      email,
      role || "CUSTOMER"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Failed to update user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};