const { Schema, model } = require("mongoose")

const modSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String
    },

    link: {
        type: String,
        required: true
    },

    downloadDate: {
        type: Date,
        default: Date.now
    },

    archiveId: {
        type: Number
    }
});

const Mod = model('mod', modSchema);

module.exports = Mod;