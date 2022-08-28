const { Thought, Reaction } = require('../models');

const reactionController = {
  // add reaction
  addReaction({ params, body }, res) {
    let newReaction = {
      reactionText: body.reactionText,
      username: body.username,
      userId: body.userId,
    };

    Reaction.create(newReaction)
      .then((dbReactionData) => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $addToSet: { reactions: dbReactionData._id } },
          { new: true }
        ).then((newreactiondata) => res.json(newreactiondata));
      })
      .catch((err) => res.json(err));
  },

  // delete thought
  deleteReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.id })
      .then((dbReactionData) => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $pull: { reactions: dbReactionData._id } }
        ).then(() => res.json('Your reaction was deleted'));
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = reactionController;
