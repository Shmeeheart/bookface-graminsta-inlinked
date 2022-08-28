const { Thought, Reaction } = require('../models');

const reactionController = {
  // add reaction
  addReaction({ params, body }, res) {
    let newReaction = {
      reactionBody: body.reactionBody,
      username: body.username,
      userId: body.userId,
    };

    // create reaction for the thought
    Reaction.create(newReaction)
      .then((dbReactionData) => {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: dbReactionData._id } },
          { new: true, runValidators: true }
        )
          .populate({ path: 'reactions', select: '-__v' })
          .select('-__v')
          .then((dbReactionData) => res.json(dbReactionData));
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
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
