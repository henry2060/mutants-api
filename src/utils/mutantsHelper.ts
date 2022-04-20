import { AppConstants } from './constants';

let countMutantSequence = 0;
export const validateDna = (dna: string[]): number => {
  let returnCountValue;
  horizontal(dna);
  vertical(dna);
  oblique(dna);
  returnCountValue = countMutantSequence;
  countMutantSequence = 0;
  return returnCountValue;
};

const horizontal = (dna: string[]) => {
  dna.forEach((sequence) => analizySequence(sequence));
};

const vertical = (dna: string[]) => {
  for (let i = 0; i < dna.length; i++) {
    let word = '';
    dna.forEach((sequence) => {
      word = word.concat(sequence.charAt(i));
    });
    analizySequence(word);
  }
};

const oblique = (dna: string[]) => {
  let word = '';
  for (let i = 0; i < dna.length; i++) {
    dna.forEach((sequence, index) => {
      if (i === index) word = word.concat(sequence.charAt(i));
    });
  }
  analizySequence(word);
};

const analizySequence = (sequence: string) => {
  if (
    AppConstants.MUTANT_DNA_SEQUENCES.find((mds) => sequence.indexOf(mds) != -1)
  ) {
    countMutantSequence += 1;
  }
};
