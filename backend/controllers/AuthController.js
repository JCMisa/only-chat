import User from "../models/UserModel.js"; 

// This endpoint will be called by the frontend after a successful Clerk sign-up or login.
// It assumes the frontend provides the correct Clerk user data in the request body.
export const syncClerkUserToDB = async (request, response) => {
    try {
        const { clerkId, email, firstName, lastName, imageUrl } = request.body;

        // Basic validation for critical fields
        if (!clerkId || !email) {
            return response.status(400).json({ message: "Clerk ID and Email are required in the request body." });
        }

        // Use findOneAndUpdate with upsert: true to either create or update the user
        // This ensures the record exists and is updated with Clerk-provided info.
        const user = await User.findOneAndUpdate(
            { clerkId: clerkId }, // Query: Find by Clerk ID
            {
                // Fields to set/update from the request body
                clerkId: clerkId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                imageUrl: imageUrl,
            },
            {
                upsert: true, // Create the document if it doesn't exist
                new: true,    // Return the updated/new document
                setDefaultsOnInsert: true // Apply schema defaults when a new doc is inserted
            }
        );

        return response.status(200).json({
            message: "User data synchronized successfully.",
            user: {
                id: user._id, 
                clerkId: user.clerkId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
                color: user.color, 
                profileSetup: user.profileSetup, 
                bio: user.bio
            }
        });
    } catch (error) {
        console.error("Error syncing user data:", error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return response.status(409).json({ message: "A user with this email already exists." });
        }
        return response.status(500).json({ message: "Internal Server Error during user synchronization." });
    }
};

export const getUserProfile = async (request, response) => {
    try {
        const { clerkId } = request.params; // Example: /api/auth/profile/:clerkId

        if (!clerkId) {
            return response.status(400).json({ message: "Clerk ID is required to fetch profile." });
        }

        const user = await User.findOne({ clerkId });

        if (!user) {
            return response.status(404).json({ message: "User profile not found in database." });
        }

        return response.status(200).json({ user: {
            id: user._id,
            clerkId: user.clerkId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            color: user.color,
            profileSetup: user.profileSetup,
            bio: user.bio
        }});

    } catch (error) {
        console.error("Error fetching user profile:", error);
        return response.status(500).json({ message: "Internal Server Error." });
    }
};