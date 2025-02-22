export const mockApiResponse = {
  data: { message: 'success' },
};

export const mockApiGet = vi.fn().mockResolvedValue(mockApiResponse);
