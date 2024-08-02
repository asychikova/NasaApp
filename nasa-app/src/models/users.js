const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/*
In Node.js, mixing import statements (ES Modules) and require statements (CommonJS) in different files can lead to inconsistencies and errors because Node.js treats files differently based on their module type. 
*/

// In any proj, ensure consistent naming conventions between the schema and the route handler.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
});

// If the password is modified, this function will be fored before the document(single row) is saved.

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// To be called upon when authentication is required.

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Modal might alredy be created else use this modal, hence :-
const User =
  mongoose.models.users || mongoose.model("nasa_app_users", userSchema);

//using require to import modules, you should also use module.exports to export them.
module.exports = User;

// Smetimes after chaning the properties of your schema, delete your db and create it again in the atlas.
