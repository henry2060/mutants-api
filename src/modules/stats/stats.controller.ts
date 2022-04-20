import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { StatsResponse } from '../../dto/stats.dto';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('/stats')
  async stats(@Res() res): Promise<StatsResponse> {
    const result = await this.statsService.stats();
    return res.status(HttpStatus.OK).send(result);
  }
}
