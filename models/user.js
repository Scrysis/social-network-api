
const { Schema, Types} = require('mongoose');

const userSchema = new Schema (
    {
        
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },

        // grabbed Regex string from: https://gist.github.com/rupeshtiwari/acf770bfc85f3fe1f62a80b461abfc13
        email: {
            type: String,
            required: true,
            unique: true,
            // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
            match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
          }

    }
)