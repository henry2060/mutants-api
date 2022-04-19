import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mutant, MutantSchema } from '../../shemas/mutants.shema';
import { Stats, StatsSchema } from '../../shemas/stats.schema';
import { MutantsController } from './mutants.controller';
import { MutantsService } from './mutants.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mutant.name, schema: MutantSchema }]),
    MongooseModule.forFeature([{ name: Stats.name, schema: StatsSchema }])
  ],
  controllers: [MutantsController],
  providers: [MutantsService]
})
export class MutantsModule {}
