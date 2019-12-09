import * as mongoose from 'mongoose';
import { MongoPaging } from 'mongoose-cursor-pagination-plugin';

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  pictureUrl: String,
  height: Number,
  mass: Number,
  hairColor: [String],
  skinColor: [String],
  eyeColor: [String],
  birthYear: String,
  gender: String,
  homeWorld: mongoose.Schema.Types.ObjectId,
  species: mongoose.Schema.Types.ObjectId,
  appearances: [mongoose.Schema.Types.ObjectId],
  vehicles: [mongoose.Schema.Types.ObjectId],
});

CharacterSchema.plugin(MongoPaging.mongoosePlugin);

export {
  CharacterSchema,
};
