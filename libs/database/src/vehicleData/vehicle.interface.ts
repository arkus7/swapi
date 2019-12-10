import { Document } from 'mongoose';

export interface Vehicle extends Document {
  name: string;
  description: string;
  pictureUrl: string;
  locations: string[];
  appearances: string[];
  dimensions: [string];
}
