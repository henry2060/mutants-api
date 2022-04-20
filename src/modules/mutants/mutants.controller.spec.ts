import { Res } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MutantResponse } from 'src/dto/mutantResponse.dto';
import { MutantsController } from './mutants.controller';
import { MutantsService } from './mutants.service';

jest.mock('./mutants.service.ts');

describe('MutantsController', () => {
  let controller: MutantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutantsController],
      providers: [MutantsService],
    }).compile();

    controller = module.get<MutantsController>(MutantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Post mutants', () => {
    const input = {
      dna: ['FFFFFF', 'FFPFFF', 'FPFFFF', 'FFFPFF', 'PFFFFF', 'PFFFFF'],
    };
    const mutantResponse: MutantResponse = { isMutant: true };
    controller.isMutant(mutantResponse, input);
    expect(controller).toBeDefined();
  });
});
