import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MutantDocument = Mutant & Document;

@Schema()
export class Mutant {
  @Prop()
  dna: string;
}

export const MutantSchema = SchemaFactory.createForClass(Mutant);
