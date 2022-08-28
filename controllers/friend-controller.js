const { User } = require('../models');

const friendController = {
  // add friend
  addFriend({ params, body }, res) {
    let newFriend = {
      friendBody: body.friendBody,
      username: body.username,
      userId: body.userId,
    };

    // create friend for a user's friend list
    Friend.create(newFriend)
      .then((dbFriendData) => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: dbFriendData._id } },
          { new: true, runValidators: true }
        )
          .populate({ path: 'friends', select: '-__v' })
          .select('-__v')
          .then((dbFriendData) => res.json(dbFriendData));
      })
      .catch((err) => res.json(err));
  },

  // delete friend
  deleteFriend({ params }, res) {
    Friend.findOneAndDelete({ _id: params.id })
      .then((dbFriendData) => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $pull: { reactions: dbFriendData._id } }
        ).then(() => res.json('Your friend was deleted'));
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = friendController;
