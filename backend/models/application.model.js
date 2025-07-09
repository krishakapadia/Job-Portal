import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{mongoose.Schema.Types.ObjectId,
        ref:'Job',

    }
})