import * as mongoose from 'mongoose';
import { MongoPaging } from 'mongoose-cursor-pagination-plugin';

const SpeciesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

SpeciesSchema.plugin(MongoPaging.mongoosePlugin);

export {
  SpeciesSchema,
};
