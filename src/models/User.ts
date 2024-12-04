import { MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../resources/values";
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    qualifications: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    candidateID: {
        type: String,
        unique: true,
        minlength: MIN_USERNAME_LENGTH,
        maxlength: MAX_USERNAME_LENGTH,
    },
    password: {
        type: String,
        minlength: MIN_PASSWORD_LENGTH,
        maxlength: MAX_PASSWORD_LENGTH,
    },
    step: {
        type: Number,
        default: 1,
    },
    prospectsApproached: {
        type: Number,
        default: 0,
    },
    usersOnBoarded: {
        type: Number,
        default: 0,
    },
})

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;