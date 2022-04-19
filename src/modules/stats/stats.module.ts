import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stats, StatsSchema } from '../../shemas/stats.schema';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stats.name, schema: StatsSchema }])
  ],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
