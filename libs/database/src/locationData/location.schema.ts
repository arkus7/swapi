import * as mongoose from 'mongoose';
import { MongoPaging } from 'mongoose-cursor-pagination-plugin';

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  pictureUrl: String,
  appearances: [mongoose.Schema.Types.ObjectId],
  climate: [String],
  terrain: [String],
});

LocationSchema.plugin(MongoPaging.mongoosePlugin);

export {
  LocationSchema,
};
