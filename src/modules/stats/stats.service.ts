import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatsMutants, StatsDocument } from '../../shemas/stats.schema';
import { Model } from 'mongoose';
import { StatsResponse } from '../../dto/stats.dto';
import { AppConstants } from '../../utils/constants';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(StatsMutants.name) private statsModel: Model<StatsDocument>,
  ) {}

  async stats(): Promise<StatsResponse> {
    let result: StatsResponse = new StatsResponse();
    try {
      const stats = await this.statsModel.findById(AppConstants.ID_DB);
      result = {
        count_mutant_dna: stats.count_mutant_dna,
        count_human_dna: stats.count_human_dna,
        ratio: stats.ratio,
      };
    } catch (error) {
      throw new HttpException(
        'error interno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }
}
