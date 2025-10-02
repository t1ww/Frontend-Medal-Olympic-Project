import apiClient from './AxiosClient'
import type { Country } from '@/types';

export default {
    getCountry(perPage: Number, page: Number) {
        return apiClient.get('/countries?_limit=' + perPage + '&_page=' + page);
    },
    getCountryid(id: Number) {
        return apiClient.get('/countries/' + id)
    },
    saveCountrys(country: Country) {
        return apiClient.post('/countries', country)
    },
    getCountryByKeyword(keyword: string, perPage: number, page: number):Promise<AxiosResponse<CountryItem[]>> {
        return apiClient.get<CountryItem[]>('/countries?name=' + keyword + '&_limit=' +perPage + '&_page=' + page)
    },
    saveCountry(countryData: any) {
        return apiClient.post('/countries', countryData);
    },
    getCountries(perPage: number, page: number, sortBy: string, order: string, keyword = '') {
        const query = '/countries?_limit='+ perPage +'&_page='+ page +'&sortBy='+ sortBy +'&order='+ order
        
        // Add keyword filter if it's provided
        const url = keyword ? query + 'name='+ keyword : query;
        return apiClient.get(url);
   
      },
    async uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
    
        const response = await apiClient.post('/uploadFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        return response.data; // Return the uploaded file's URL
    },
    updateCountryMedals(countryId: number) {
        return apiClient.put('/countries/' + countryId+ '/updateMedals');
    },
};

