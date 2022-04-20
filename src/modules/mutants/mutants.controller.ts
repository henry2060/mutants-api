import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MutantDTO } from '../../dto/mutant.dto';
import { MutantResponse } from '../../dto/mutantResponse.dto';
import { MutantsService } from './mutants.service';

@Controller()
export class MutantsController {
  constructor(private mutantService: MutantsService) {}
  @Post('/mutants')
  async isMutant(
    @Res() res,
    @Body() mutant: MutantDTO,
  ): Promise<MutantResponse> {
    const result = await this.mutantService.isMutant(mutant);
    return res.status(HttpStatus.OK).send(result);
  }
}
