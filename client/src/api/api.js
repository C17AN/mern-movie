import axios from "axios";

// 원래 이렇게 api 파일을 분리해서 사용하나?
// axios.create를 사용하는 방법에 대해 알아봐야 할듯
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// axios.create() 로 axios 객체를 생성한 후 HTTP 메서드를 활용한다.
// 개쉬운데?!
export const insertMovie = (payload) => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMovie = (id, payload) => api.put(`/movie/${id}`, payload);
export const deleteMovie = (id, payload) => api.delete(`/movie/${id}`);
export const getMovie = (id) => api.get(`/movie/${id}`);

const apis = {
  insertMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovie,
};

export default apis;
