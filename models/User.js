const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'An email is required!',
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Please enter a valid e-mail address',
      ],
    },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friend: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual('thoughtCount').get(function () {
  return this.thought.reduce(
    (total, thought) => total + thought.replies.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;
