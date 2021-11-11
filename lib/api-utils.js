export const fetchAllPosts = async () => {
  const response = await fetch('http://localhost:3000/api/posts');
  const data = await response.json();
  return data;
};

export const fetchById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  const data = await response.json();
  return data;
};

