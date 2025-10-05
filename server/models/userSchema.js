// Keeping the original Schema for any Rollback cases
// import mongoose from "mongoose";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// // import  from "";
// dotenv.config();
// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
//   isReadOnlyAdmin:{
//     type:Boolean,
//     default:false,
//   },
//   watchlist: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Course',
//     },
//   ],
//   bookmarkedRoadmaps: [
//     {
//       name: { type: String, required: true },
//       link: { type: String, required: true },
//       icon: { type: String },
//       type: { type: String, enum: ['role', 'skill'], required: true }
//     }
//   ],
// });


// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     next();
//   }
//   try {
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(user.password, salt);
//     user.password = hashedPassword;
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.generateToken = async function () {
//   try {
//     const secretkey = process.env.JWT_SECRET || "defaultSecretKey";
//     return jwt.sign(
//       {
//         userId: this._id.toString(),
//         email: this.email,
//         isAdmin: this.isAdmin,
//       },
//       secretkey,
//       {
//         expiresIn: "30d",
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };
// userSchema.methods.comparePassword = async function (plainTextPassword) {
//   try {
//     return await bcryptjs.compare(plainTextPassword, this.password);
//   } catch (error) {
//     console.error("Password comparison error:", error);
//     return false; // Always return false on error for security
//   }
// }
// const User = mongoose.model("User", userSchema);
// export default User;


import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return !this.isOAuth; // required only for manual users
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.isOAuth; // required only for manual users
    },
  },
  phone: {
    type: String,
    required: function () {
      return !this.isOAuth; // required only for manual users
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isReadOnlyAdmin: {
    type: Boolean,
    default: false,
  },
  watchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  bookmarkedRoadmaps: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
      icon: { type: String },
      type: { type: String, enum: ["role", "skill"], required: true },
    },
  ],
  googleId: {
    type: String,
    unique: true,
    sparse: true, // allows null for non-OAuth users
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true, // allows null for non-OAuth users
  },
  isOAuth: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
});

//Hash password only if user is not OAuth and password is modified
userSchema.pre("save", async function (next) {
  //if (!this.isModified("password") || this.isOAuth) { //now we want to hash password if it is modified and user is not OAuth
    if (!this.isModified("password")){
    return next();
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


//JWT generation method
userSchema.methods.generateToken = async function () {
  try {
    const secretkey = process.env.JWT_SECRET || "defaultSecretKey";
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      secretkey,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//Compare password method
userSchema.methods.comparePassword = async function (plainTextPassword) {
  try {
    return await bcryptjs.compare(plainTextPassword, this.password);
  } catch (error) {
    console.error("Password comparison error:", error);
    return false; // Always return false on error for security
  }
};
const User = mongoose.model("User", userSchema);
export default User;
