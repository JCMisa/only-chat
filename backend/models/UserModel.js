import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // --- REQUIRED: Link to Clerk User ---
    clerkId: {
      type: String,
      required: true,
      unique: true, // Ensures a one-to-one mapping with Clerk users
      index: true,  // For faster lookups by Clerk ID
    },
    email: {
      type: String,
      required: [true, "Email is required."], // Email will come from Clerk
      unique: true, // Still good for ensuring uniqueness within your system
      lowercase: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid email address."],
    },
    firstName: {
      type: String,
      required: false, //  synced from Clerk, or managed locally
      trim: true,
    },
    lastName: {
      type: String,
      required: false, //  synced from Clerk, or managed locally
      trim: true,
    },
    imageUrl: {
      type: String, //  synced from Clerk (profile picture)
      required: false,
    },
    color: { 
      type: String,
      required: false,
    },
    profileSetup: { // To track if user has completed initial profile setup in your app
      type: Boolean,
      default: false,
    },
    bio: {
        type: String,
        required: false,
        maxlength: [500, "Bio cannot exceed 500 characters."],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;