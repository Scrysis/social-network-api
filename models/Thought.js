const { Schema, model} = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            getter: () => this.default.toDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [{type: Schema.Types.ObjectId, ref: 'reaction'}],
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;