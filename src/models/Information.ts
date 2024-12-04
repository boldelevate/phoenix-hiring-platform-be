import mongoose from "mongoose";

const informationSchema = new mongoose.Schema({
    candidateID: {
        type: String,
        required: true,
    },
    responseJSON: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    informationType: {
        type: String,
        required: true,
    },
})

const Information = mongoose.model("Information", informationSchema);

export default Information;