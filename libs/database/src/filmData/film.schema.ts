import * as mongoose from 'mongoose';

export const FilmSchema = new mongoose.Schema({
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
