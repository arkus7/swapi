import { Document } from 'mongoose';

export interface Species extends Document {
  name: string;
}
