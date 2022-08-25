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
      required: true,
      unique: true,
      //must match a valid email address (look into Mongoose's matching validation)
    },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
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
