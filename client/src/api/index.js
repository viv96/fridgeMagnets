import axios from "axios";

// const url = "http://localhost:8080/posts";
const url = `https://data.fridgemagnetsserver.com/posts`;
// export const fetchPosts = () => axios.get(url);
export const fetchPosts = () =>
  axios.get(
    `https://wmu53x8bd0.execute-api.us-east-2.amazonaws.com/default/scanADynamoDbTable`
  );
export const createPosts = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatePost) =>
  axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
