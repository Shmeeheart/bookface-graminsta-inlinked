const { User } = require('../models');

const friendController = {
  addFriend({ params, body }, res) {
    User.findOneAndUpdate();
    {
      _id: params.userId;
    }, 
    { $addToSet: { friends: params.friendId } },
    { new: true}
  },
};
