const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ body }, res) {
    let newThought = {
      thoughtText: body.thoughtText,
      username: body.username,
      userId: body.userId,
    };

    Thought.create(newThought)
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $addToSet: { reactions: dbThoughtData._id } },
          { new: true }
        ).then((newthoughtdata) => res.json(newthoughtdata));
      })
      .catch((err) => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Your thought has been updated!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $pull: { thoughts: dbThoughtData._id } }
        ).then(() => res.json('Your thought was deleted'));
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
