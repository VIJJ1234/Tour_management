import User from '../models/User.js'

// Create a new user
export const createUser = async (req, res) => {
    const newUser=new User(req.body)
    try {
      const savedUser=await newUser.save();
  
      res.status(200).json({
        success: true,
        message: 'Successfully created',
        data: savedUser,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to create. Try again'
      });
    }
};

// Update an existing user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update"
        });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deletedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        });
    }
};

// Get a single user by ID
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Successful",
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user. Try again"
        });
    }
};

// Get all users
export const getAllUser = async (req, res) => {
    // const page = parseInt(req.query.page);

    console.log(page);
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users. Try again"
        });
    }
};
