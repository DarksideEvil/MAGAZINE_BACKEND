const userModel = require('./user.model');

const addUser = async (req, res) => {
    const sameUser = await userModel.exists({ email: req.body.email });
    if (sameUser) {
      return res.status(400).json("This user is already available in the database!");
    }
    
    const USER = req.user;
    try {
      if (USER && USER.role === "admin") {
        const user = new userModel(
          _.pick(req.body, [
            "fullname",
            "phone",
            "silverPoint",
            "goldPoint",
            "email",
            "role",
            "password"
          ])
        );
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res
          .status(201)
          .json(_.pick(user, ["fullname", "phone", "silverPoint", "goldPoint", "email", "role"]));
        if (!user) {
          return res.status(400).send("Couldn't post new user!");
        }
      } else {
        return res.status(403).send("Prohibited");
      }
    } catch (err) {
      logError(err);
      return res.status(400).send(err.message);
    }
  };
  
  const getUsers = async (req, res) => {
    const USER = req.user;
    try {
      if (USER.role === "admin" || USER.role === "boss") {
        const users = await userModel.find().sort("-createdAt");
        res.status(200).json(users);
        if (!users) {
          return res.status(400).send("Couldn't get users!");
        }
      } else {
        return res.status(403).send("Prohibited");
      }
    } catch (err) {
      logError(err);
      return res.status(400).send(err.message);
    }
  };

  const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
            res.status(200).json(user);
        if (!user)
            return res.status(400).send('could\'t get that user 👲🏻');
    } catch (err) {
        logError(err);
        return res.status(400).send(err.message);
    }
}
  
  const editUser = async (req, res) => {
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, select: "-password" });
      res.status(200).json(user);
      if (!user) {
        return res.status(400).send("Couldn't update this user!");
      }
    } catch (err) {
      logError(err);
      return res.status(400).send(err.message);
    }
  };
  
  const deleteUser = async (req, res) => {
    const USER = req.user;
    try {
      if (USER && USER.role === "admin") {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
        if (!user) {
          return res.status(400).send("Couldn't delete this user!");
        }
      } else {
        return res.status(403).send("Prohibited");
      }
    } catch (err) {
      logError(err);
      return res.status(400).send(err.message);
    }
  };
  
  module.exports = {
    addUser,
    getUsers,
    getUser,
    editUser,
    deleteUser
  };