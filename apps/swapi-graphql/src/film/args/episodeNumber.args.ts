import { Min } from 'class-validator';
import { Field, Int } from 'type-graphql';

export class EpisodeNumberArgs {
  @Field(type => Int)
  @Min(1)
  episodeNumber: number;
}
