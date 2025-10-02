// services/SportsService.ts
import apiClient from "./AxiosClient";

export default {
    getSport(perPage: Number, page: Number) {
        return apiClient.get('/sports?_limit=' + perPage + '&_page=' + page)
    },
    getSportId(id: Number) {
        return apiClient.get('/sports/' + id)
    },
    async createSporttwo(sportData: any) {
      const response = await apiClient.post('/sports' + sportData);
      await this.updateCountryMedals(sportData.country_id); // Update country medals
      return response.data;
    },
    async updateCountryMedals(countryId: number) {
      return await apiClient.put('/countries/' + countryId + '/updateMedals');
    },
    getSports() {
      return apiClient.get('/sports'); // Fetch all sports
    },
    createSport(data: any) {
      return apiClient.post('/sports', data); // Create a new sport
    },
}
