import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatsDocument = Stats & Document;

@Schema()
export class Stats {
  @Prop()
  count_mutant_dna: number;

  @Prop()
  count_human_dna: number;

  @Prop()
  ratio: number;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
