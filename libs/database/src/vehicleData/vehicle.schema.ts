import * as mongoose from 'mongoose';
import { MongoPaging } from 'mongoose-cursor-pagination-plugin';

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  pictureUrl: String,
  locations: [mongoose.Schema.Types.ObjectId],
  appearances: [mongoose.Schema.Types.ObjectId],
  dimensions: [String],
});

VehicleSchema.plugin(MongoPaging.mongoosePlugin);

export {
  VehicleSchema,
};
