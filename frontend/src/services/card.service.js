import http from "../httpCommons";

class CardDataService {
  getAll() {
    return http.get("/cards");
  }

  create(data) {
    return http.post("/cards", data);
  }
}

export default new CardDataService();