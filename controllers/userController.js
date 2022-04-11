const { User, Thought } = require('../models');

module.exports = {
    getUsers(req,res) {
        User.find()
        
        .then(users => res.send(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean()
        .then(async(user) =>
          !user
            ? res.status(404).json({ message: 'No User found' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
  
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such User' })
            : Thought.deleteMany({ _id: { $in: user.thoughts} })
        )
          .then(() => res.json({ message: 'User and thoughts removed.' }))
          .catch((err) => res.status(500).json(err));   
    },
  
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No User with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    addFriend(req, res) {
      console.log('You added a new friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId} },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No User found with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        {  new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No User found with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };