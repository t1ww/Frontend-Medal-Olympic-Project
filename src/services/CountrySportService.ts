import apiClient from "./AxiosClient"

export default {
    getCountrySport(perPage: Number, page: Number) {
        return apiClient.get('/countrysports?_limit=' + perPage + '&_page=' + page)
    },
    getCountrySportsByCountryId(id: Number) {
        return apiClient.get('/countrysports/' + id)
    },
    getCountrySports() {
        return apiClient.get('/countrysports')
    },
    save(data: any) {
        return apiClient.post('/countrysports', data); // Save and update medals in backend
    },
    updateCountryMedals(countryId: number) {
        return apiClient.put('/countries/'+countryId+'/updateMedals'); // Updates medals
    },
}