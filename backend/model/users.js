const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

MONGODB_URI =
  process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/j-visual";

mongoose.connect(MONGODB_URI);

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, maxlength: 30 },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9_]+$/,
  },
  createdAt: { type: Date, default: Date.now },
});

const VocabularySchema = new mongoose.Schema({
  japanese: { type: String, required: true },
  romaji: { type: String, required: true },
  english: { type: String, required: true },
  imgUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Vocabulary = mongoose.model("Vocabulary", VocabularySchema);

module.exports = { User, Vocabulary };
