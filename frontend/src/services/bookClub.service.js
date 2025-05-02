import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/book-clubs';

class BookClubService {
  getAllBookClubs() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getBookClub(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  createBookClub(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  joinBookClub(id) {
    return axios.post(`${API_URL}/${id}/join`, {}, { headers: authHeader() });
  }

  updateBookClub(id, data) {
    return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
  }

  deleteBookClub(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
}

export default new BookClubService(); 