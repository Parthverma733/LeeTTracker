const API_URL = import.meta.env.VITE_API_URL;

export const fetchProfile = async (username) => {
  const response = await fetch(`${API_URL}/profile/${username}`);

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

export const fetchRecentProblems = async (username) => {
  const response = await fetch(`${API_URL}/recent/${username}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recent problems");
  }

  return response.json();
};
