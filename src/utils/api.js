const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (userName) => {
  try {
    const response = await fetch(`${BASE_URL}/search/users?q=${userName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDetailByUser = async (login) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${login}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const getFollowersNumberByUser = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}