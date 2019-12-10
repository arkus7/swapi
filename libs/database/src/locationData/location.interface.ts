import { Document } from 'mongoose';

export interface Location extends Document {
  name: string;
  description: string;
  pictureUrl: string;
  appearances: string[];
  climate: string[];
  terrain: string[];
}
