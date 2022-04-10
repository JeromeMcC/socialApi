const { User, Thought } = require('../models');

module.exports = {
    getUsers(req,res) {
        User.find()
        
        .then(users => res.send(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userid })
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
      User.findOneAndDelete({ _id: req.params.userid })
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
        { _id: req.params.userid },
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
        { _id: req.params.userid },
        { $addToSet: { friends: req.body } },
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
        { _id: req.params.userid },
        { $pull: { friend: { friendid: req.params.friendid } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No User found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };