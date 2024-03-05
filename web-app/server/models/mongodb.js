import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Testudo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err, '<----- mongoose error in connect'));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  projects: [{}],
});

const User = mongoose.model('User', userSchema);

const projectSchema = new Schema({
  name: { type: String, required: true },
})

const Project = mongoose.model('Project', projectSchema);

const sessionSchema = new Schema({
  cookieID: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 86400, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

const metricsSchema = new Schema({
  testedOn: {type: String},
  audit: {type: Object},
  // categories: {type: Object},
});

const Metric = mongoose.model('Metric', metricsSchema);

export { User, Project, Session, Metric };
