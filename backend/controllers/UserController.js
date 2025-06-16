import User from "../models/UserModel.js"; 

export const getAllUser = async (request, response) => {
    try {
        const users = await User.find({});

        if (!users || users.length === 0) {
            return response.status(404).json({ message: "No users found in database." });
        }

        // Map through all users to format each user's data
        const formattedUsers = users.map(user => ({
            id: user._id,
            clerkId: user.clerkId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            color: user.color,
            profileSetup: user.profileSetup,
            bio: user.bio
        }));

        return response.status(200).json({ users: formattedUsers });

    } catch (error) {
        console.error("Error fetching users:", error);
        return response.status(500).json({ message: "Internal Server Error." });
    }
};

export const getUserById = async (request, response) => {
    try {
        const { clerkId } = request.params;

        const user = await User.findOne({ clerkId });

        if (!user) {
            return response.status(404).json({ 
                message: "User not found" 
            });
        }

        const formattedUser = {
            id: user._id,
            clerkId: user.clerkId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            color: user.color,
            profileSetup: user.profileSetup,
            bio: user.bio
        };

        return response.status(200).json({ user: formattedUser });

    } catch (error) {
        console.error("Error fetching user:", error);
        return response.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
};