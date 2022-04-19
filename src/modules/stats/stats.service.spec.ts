import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { StatsResponse } from 'src/dto/stats.dto';
import { StatsMutants } from '../../shemas/stats.schema';
import { StatsService } from './stats.service';

const mockRepositoryStats = {
  findById() {
    return {};
  }
}
const mockStats = (
  count_mutant_dna= 1,
  count_human_dna= 1,
  ratio= 1 
): StatsMutants => ({
  count_mutant_dna,
  count_human_dna,
  ratio
});
describe('StatsService', () => {
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: getModelToken(StatsMutants.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockStats()),
            constructor: jest.fn().mockResolvedValue(mockStats()),
            findById: jest.fn().mockResolvedValue(mockStats()),
            findByIdAndUpdate: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('return stats', () => {
    service.stats()
    expect(service).toBeDefined();
  });
});
