import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MutantDTO } from '../../dto/mutant.dto';
import { MutantResponse } from '../../dto/mutantResponse.dto';
import { Mutant, MutantDocument } from '../../shemas/mutants.shema';
import { AppConstants } from '../../utils/constants';
import { validateDna } from '../../utils/mutantsHelper';
import { Model } from 'mongoose';
import { StatsMutants, StatsDocument } from '../../shemas/stats.schema';

@Injectable()
export class MutantsService {
  constructor(
    @InjectModel(Mutant.name) private mutantModel: Model<MutantDocument>,
    @InjectModel(StatsMutants.name) private statsModel: Model<StatsDocument>,
  ) {}

  async isMutant(mutant: MutantDTO): Promise<MutantResponse> {
    let result: MutantResponse = new MutantResponse();
    const dna = mutant.dna;
    const isNotQuadraticMatrix = dna.find(
      (sequence) => sequence.length !== dna.length,
    );
    let completeDna = '';

    if (isNotQuadraticMatrix) {
      throw new HttpException(
        'matrix is not quadratic',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dna.length < AppConstants.SEQUENCE_NUMBER) {
      throw new HttpException(
        'dna sequence need to be more than 4',
        HttpStatus.BAD_REQUEST,
      );
    }

    const dnaUpperCase = dna.map((sequence) => {
      completeDna += sequence;
      return sequence.toUpperCase();
    });

    try {
      const dnaDb = await this.mutantModel.findOne({ dna: completeDna });
      if (dnaDb) {
        throw new HttpException('dna already exist', HttpStatus.FORBIDDEN);
      }
      await this.mutantModel.create({ dna: completeDna.toUpperCase() });
    } catch (error) {
      throw new HttpException(`Error: ${error.message}`, HttpStatus.FORBIDDEN);
    }

    const countMutantSequence = validateDna(dnaUpperCase);

    try {
      const stats = await this.statsModel.findById(AppConstants.ID_DB);
      const isMutant =
        countMutantSequence >= AppConstants.MINIMUM_SEQUENCE_REQUIRED;
      stats.count_mutant_dna = isMutant
        ? stats.count_mutant_dna + 1
        : stats.count_mutant_dna;
      stats.count_human_dna = isMutant
        ? stats.count_human_dna
        : stats.count_human_dna + 1;
      stats.ratio = +(stats.count_mutant_dna / stats.count_human_dna).toFixed(
        2,
      );
      await this.statsModel.findByIdAndUpdate(AppConstants.ID_DB, {
        count_mutant_dna: stats.count_mutant_dna,
        count_human_dna: stats.count_human_dna,
        ratio: stats.ratio,
      });
      result = { isMutant };
    } catch (error) {
      throw new HttpException(
        'internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }
}
