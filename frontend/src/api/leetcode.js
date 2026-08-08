const API_URL = import.meta.env.VITE_API_URL;

export const fetchProblems = async ({
  skip = 0,
  limit = 50,
  difficulty = "",
  topic = "",
} = {}) => {
  const params = new URLSearchParams({
    skip,
    limit,
  });

  if (difficulty && difficulty !== "All") {
    params.append("difficulty", difficulty);
  }

  if (topic && topic !== "All") {
    params.append("topic", topic);
  }

  const response = await fetch(
    `${API_URL}/problems?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  return response.json();
};