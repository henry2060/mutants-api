export const StatsService = jest.fn().mockReturnValue({
  stats: jest.fn().mockResolvedValue({ isMutant: true }),
});
