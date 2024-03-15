const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Example: Ensure password has at least one lowercase, one uppercase, and one digit
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
      },
      message:
        "Password must contain at least one lowercase, one uppercase, and one digit",
    },
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
