import * as mongoose from 'mongoose';
import { MongoPaging } from 'mongoose-cursor-pagination-plugin';

const FilmSchema = new mongoose.Schema({
  title: String,
  episodeNumber: Number,
  openingCrawl: String,
  directors: [String],
  producers: [String],
  releaseDate: Date,
  runTime: Number,
  budget: Number,
  posterUrl: String,
});

FilmSchema.plugin(MongoPaging.mongoosePlugin);

export {
  FilmSchema,
};
