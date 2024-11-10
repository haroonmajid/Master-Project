import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=10';


export const fetchQuestions = async (retryCount = 3, delay = 1000) => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    if (error.response && error.response.status === 429 && retryCount > 0) {
      console.warn(`Rate limited: retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay)); // Wait for the delay
      return fetchQuestions(retryCount - 1, delay * 2); // Retry with exponential backoff
    } else {
      console.error("Error fetching data: ", error);
      return [];
    }
  }
};
