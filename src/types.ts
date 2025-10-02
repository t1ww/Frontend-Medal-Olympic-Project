export interface Country {
    id: number,
    code: string,
    name: string,
    flagUrl: string,
    gold: number,
    silver: number,
    bronze: number,
    ranking: number,
    capital: string,
    population: number,
    area: string
    continent: string,
    nationalLanguage: string,
    totalMedals: number,
    countrySports: {
        id: number,
        countryId: number,
        sportId: number,
        sportName: string,
        gold: number,
        silver: number,
        bronze: number,
    }
}

export interface CountrySport {
    id: number
    countryName: string
    sportName: string
    gold: number
    silver: number
    bronze: number
}
  
export interface Sports {
    id: number,
    sportName: string,
    countrySports: {
        id: number,
        countryName: string,
        sportName: string,
        gold: number,
        silver: number,
        bronze: number
    }
}

export interface CountryState {
    country: Country | null
}

export interface SportState {
    sport: Sports | null
}

export interface CountrySportState {
    countrySport: CountrySport | null
}

export interface MessageState{
    message: string
}