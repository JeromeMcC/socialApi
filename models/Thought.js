const { Schema, Types } = require("mongoose");

const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    },
  username: {
  type: Schema.Types.ObjectId,    
  type: String,
  ref: "User",
  required: true,
  },
  reactions: [reactionSchema],
},
{
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);
  thoughtsSchema.virtual('reactionCount').get(function() {
      return this.reaction.length;
  });

  const Thought = model('Thought', thoughtsSchema)

module.exports = thought;