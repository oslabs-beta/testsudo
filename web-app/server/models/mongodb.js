const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    ignoreUndefined: true,
    dbName: 'Testudo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: false, unique: true },
  password: { type: String },
  email: { type: String, unique: true, sparse: true },
  projects: [{}],
  tokens: [
    {
      provider: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
    },
  ],
});

const User = mongoose.model('User', userSchema);

const projectSchema = new Schema({
  name: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema);

const sessionSchema = new Schema({
  cookieID: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 86400, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

const securitySchema = new Schema({
  projectID: {
    type: String,
    required: true,
    unique: true,
  },
  data: [
    {
      severity: {
        type: String,
        required: true,
      },
      cwe_id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
      line_number: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Security = mongoose.model('Security', securitySchema);

module.exports = { User, Project, Session, Security };
