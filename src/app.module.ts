import { Module } from '@nestjs/common';
import { MutantsModule } from './modules/mutants/mutants.module';
import { StatsModule } from './modules/stats/stats.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MutantsModule,
    StatsModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
