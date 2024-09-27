// const { User, Project } = require('../models/mongodb.js');
const bcrypt = require('bcryptjs');
const supabase = require('../../build/web-app/server/models/supa.js');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {

    console.log('testing start');
    const { data, error } = await supabase
      .from('user')
      .insert({ user_email: email, user_password: hashedPassword })
      .select('*');

    console.log('testing ends');

    console.log(data, '<---- data');
    // const newUser = await User.create({
    //   email,
    //   password: hashedPassword,
    // });
    res.locals.user = data[0];
    res.locals.userID = data[0].id;

    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.createUser',
      status: 400,
      message: { err: 'Create User Error' + error.message },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  // const { data , error } = await supabase
  // .from('user')
  // .select('*')
  // .eq('user_email', email )

  try {

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_email', email)

    const userID = data[0].id;
    const userPassword = data[0].user_password;


    if (!data.length) {
      res.locals.authenticate = false;
      return next();
    } else {
      const isMatch = await bcrypt.compare(password, userPassword);
      res.locals.authenticate = isMatch;
      res.locals.userID = userID;
      return next();
    }
  } catch (error) {
    return next({
      log: 'Error in userController.verifyUser',
      status: 400,
      message: { err: 'Error verifying user' },
    });
  }
};

userController.getUser = async (req, res, next) => {
  const userid = req.cookies.ssid;

  try {
    // const user = await user.findone({ _id: userid });
    const { data, error } = supabase
      .from('user')
      .select()
      .eq('id', userid)

    const user = data;
    res.locals.user = user;
    return next();

  } catch (error) {
    return next({
      log: 'error in usercontroller.getuser',
      status: 400,
      message: { err: 'error getting user' },
    });
  }
};

userController.checkDuplicate = async (req, res, next) => {
  const { email } = req.params;
  try {
    // const user = await User.findOne({ email });

    const { data, error } = await supabase
      .from('user')
      .select()
      .eq('user_email', email);

    if (!data.length) {
      res.locals.duplicate = true;
    } else {
      res.locals.duplicate = false;
    }
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.checkDuplicate',
      status: 400,
      message: { err: 'Error checking duplicate ' + error.message },
    });
  }
};

userController.addProject = async (req, res, next) => {
  const { name } = req.body;
  const userID = req.cookies.ssid;

  try {
    // const newProject = await Project.create({ name });
    //
    // const user = await User.findOne({ _id: userID });
    //
    const { data, error } = await supabase
      .from('project')
      .insert({ user_id: userID, project_name: name })
      .select();

    const newProjectID = data[0].id;

    // if (!user.projects) user.projects = [];
    // user.projects.push(newProject);

    // res.locals.user = await user.save();
    res.locals.user = data;
    res.locals.projectID = newProjectID;
    return next();

  } catch (error) {
    return next({
      log: 'Error in userController.addProject',
      status: 400,
      message: { err: 'Error adding project' },
    });
  }
};

userController.deleteProject = async (req, res, next) => {
  const { projectID } = req.params;
  console.log('project ID from userControllerDlete project is ' + projectID)
  const userID = req.cookies.ssid;

  try {
    // const user = await User.findOne({ _id: userID });
    // const newProjects = user.projects.filter(project => project._id.toString() !== projectID);
    // const newUser = await User.updateOne({ _id: userID }, { projects: newProjects });
    //
    const { data, user } = supabase
      .from('project')
      .delete()
      .eq('id', projectID)

    // res.locals.user = newUser;
    console.log('new user is ' + newUser);
    // await Project.findOneAndDelete({ _id: projectID });
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.deleteProject',
      status: 400,
      message: { err: 'Error adding project:' + error.message },
    })
  }
}

module.exports = userController;
