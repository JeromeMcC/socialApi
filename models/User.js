const { Module } = require('module');
const {Schema, Types } = require('mongoose'); 
const thoughtsSchema = require('./Thought');
const userSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unique: true,
            trim: true

        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,'invalid email!']
        },
        thoughts:[{
            type:Schema.Types.ObjectId,
            ref:'Thought'
        }],
        friends:[{
            type:Schema.Types.ObjectId,
            ref:'User'
        }],
    }
);    
    // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return ` ${this.friends.length}`;
});

const User = model('user', userSchema);

module.exports = User;