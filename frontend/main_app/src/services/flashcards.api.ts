import axios from "axiosInstance";


class FlashcardsApi {
  async getCollections() {
    const response = await axios.get("api/collections/user/");
    return response.data;
  }
}

export default new FlashcardsApi();
