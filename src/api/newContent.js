const getSavedMCQs = async (userId) => {
  try {
    const response = await apiClient.get('/fetch/mcqs', {
      params: { userId },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

