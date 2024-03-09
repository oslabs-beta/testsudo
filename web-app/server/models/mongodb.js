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
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
<<<<<<< HEAD
  username: { type: String, required: false, unique: true },
=======
>>>>>>> 49fbc26d35a322e2ea4efd704ede9ee687a0428f
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  projects: [{}],
});

const User = mongoose.model('User', userSchema);

const projectSchema = new Schema({
  name: { type: String, required: true },
<<<<<<< HEAD
  key: { type: String, required: true },
});

export default User;
=======
})

const Project = mongoose.model('Project', projectSchema);

const sessionSchema = new Schema({
  cookieID: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 86400, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

export { User, Project, Session };
>>>>>>> 49fbc26d35a322e2ea4efd704ede9ee687a0428f
