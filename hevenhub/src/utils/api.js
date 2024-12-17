import axios from 'axios';

// Get the token from localStorage
const token = localStorage.getItem('authToken');

// Set the token in the default headers if available
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Example of an API request to get data
const getHotels = async () => {
  try {
    const response = await axios.get('/api/v1/hotel/getAllHotels');
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
  }
};

export { getHotels };
