export const MutantsService = jest.fn().mockReturnValue({
  isMutant: jest.fn().mockResolvedValue({ isMutant: true }),
});
