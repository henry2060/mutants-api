import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Mutant, MutantDocument } from '../../shemas/mutants.shema';
import { StatsMutants, StatsDocument } from '../../shemas/stats.schema';
import { MutantsService } from './mutants.service';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

describe('MutantsService', () => {
  let service: MutantsService;

  const mockMutant = (
    dna = 'ATGCGACAGTGCTTATGTAGAAGGCCCCTACCACTG',
  ): Mutant => ({
    dna,
  });

  const mockStats = (
    _id = '625ddab5a8e642ef3b8d785b',
    count_mutant_dna = 1,
    count_human_dna = 1,
    ratio = 1,
  ): StatsMutants => ({
    _id,
    count_mutant_dna,
    count_human_dna,
    ratio,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantsService,
        {
          provide: getModelToken(Mutant.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockMutant()),
            constructor: jest.fn().mockResolvedValue(mockMutant()),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(StatsMutants.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockStats()),
            constructor: jest.fn().mockResolvedValue(mockStats()),
            findById: jest.fn().mockResolvedValue(mockStats()),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MutantsService>(MutantsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('isMutant true', async () => {
    const input = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'CCACTG'],
    };
    const result = await service.isMutant(input);
    expect(result).toStrictEqual({ isMutant: true });
  });
  it('isMutant false', async () => {
    const input = {
      dna: ['FFFFFF', 'FFPFFF', 'FPFFFF', 'FFFPFF', 'PFFFFF', 'PFFFFF'],
    };
    const result = await service.isMutant(input);
    expect(result).toStrictEqual({ isMutant: false });
  });
  it('isMutant error in matrix dimension', async () => {
    const input = {
      dna: ['FFFFFF', 'FFPFFF', 'FPFFFF'],
    };
    try {
      await service.isMutant(input);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
  it('isMutant error dimension dna invalid', async () => {
    const input = {
      dna: ['FF', 'FF'],
    };
    try {
      await service.isMutant(input);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('isMutant dna already exist', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantsService,
        {
          provide: getModelToken(Mutant.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockMutant()),
            constructor: jest.fn().mockResolvedValue(mockMutant()),
            findOne: jest.fn().mockResolvedValue(mockMutant()),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(StatsMutants.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockStats()),
            constructor: jest.fn().mockResolvedValue(mockStats()),
            findById: jest.fn().mockResolvedValue(mockStats()),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MutantsService>(MutantsService);
    const input = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'CCACTG'],
    };
    try {
      await service.isMutant(input);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
