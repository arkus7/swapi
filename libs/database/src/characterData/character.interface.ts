import { Document } from 'mongoose';

export interface Character extends Document {
  name: string;
  description: string;
  pictureUrl: string;
  height: number;
  mass: number;
  hairColor: string[];
  skinColor: string[];
  eyeColor: string[];
  birthYear: string;
  gender: string;
  homeWorld: string;
  species: string;
  appearances: string[];
  vehicles: string[];
}
