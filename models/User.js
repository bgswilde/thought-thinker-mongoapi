const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// establish the schema for users
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            // using a regex for email validation
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                // pulls the _id value for thoughts linked to this user
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                // pulls the _id value for other users who are friends of this user
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            // allows use of virtuals and getters for counting
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, user) => total + user.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;