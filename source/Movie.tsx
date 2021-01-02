import mongoose, { Schema } from 'mongoose';
import IMovie from './IMovie';

mongoose.connect('mongodb://localhost:27017/guoyudianying', { useNewUrlParser: true, useUnifiedTopology: true });

const MovieSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        english: { type: String, required: true },
        chinese: { type: String, required: true },
        stream: { type: String, required: true }
    },
    { collection : 'nineEKanKan' }
);

export default mongoose.model<IMovie>('Movie', MovieSchema);