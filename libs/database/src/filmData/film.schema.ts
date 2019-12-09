import * as mongoose from 'mongoose';
import { MongoPaging } from 'mongoose-cursor-pagination-plugin';

const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  episodeNumber: { type: Number, required: false, sparse: true },
  openingCrawl: String,
  directors: [String],
  producers: [String],
  releaseDate: Date,
  runTime: Number,
  budget: Number,
  posterUrl: String,
  precededBy: mongoose.Schema.Types.ObjectId,
  followedBy: mongoose.Schema.Types.ObjectId,
});

FilmSchema.plugin(MongoPaging.mongoosePlugin);

export {
  FilmSchema,
};
