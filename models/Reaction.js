const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        defualt: Date.now,
    },
},
{
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

module.exports = reactionSchema;