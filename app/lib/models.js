const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 70
    },
    lastname: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 70
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 70
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const User = mongoose.models.BrandedStreamsUser || mongoose.model("BrandedStreamsUser", userSchema);