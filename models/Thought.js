const { timeStamp } = require("console");
const { Schema, Types } = require("mongoose");
const { type } = require("os");

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
    get: timeStamp => {
        dateformat(timeStamp)
    },
  },
  username: {
  type: String
   
});
