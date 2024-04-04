const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Testudo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: false, unique: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  projects: [{}],
  tokens: [{
    provider: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
}]
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

module.exports = { User, Project, Session };
