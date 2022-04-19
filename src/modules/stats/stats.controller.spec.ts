import { Test, TestingModule } from '@nestjs/testing';
import { StatsResponse } from 'src/dto/stats.dto';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';


jest.mock('./stats.service.ts')

describe('StatsController', () => {
  let controller: StatsController;
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [StatsService]
    }).compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Get stats', () => {
    const res:StatsResponse={
      count_mutant_dna:1,
      count_human_dna: 1,
      ratio: 1 
    }
    controller.stats(res)
    expect(controller).toBeDefined();
  });
});
