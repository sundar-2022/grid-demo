export interface LanguageObject {
    en: string;
    se?: string;
    no?: string;
    sameAs?: string[];
    latitude?: string;
    longitude?: string;
    [key: string]: any;
  }
  
  export interface Place {
    city: LanguageObject;
    country: LanguageObject;
    cityNow: LanguageObject & {
      sameAs: string[];
      latitude: string;
      longitude: string;
    };
    countryNow: LanguageObject & {
      sameAs: string[];
      latitude: string;
      longitude: string;
    };
    continent: LanguageObject;
    locationString: LanguageObject;
  }
  
  export interface Birth {
    date: string;
    place: Place;
  }
  
  export  interface User {
    id: string;
    knownName: LanguageObject;
    givenName: LanguageObject;
    familyName: LanguageObject;
    fullName: LanguageObject;
    fileName: string;
    gender: string;
    birth: Birth;
    [key: string]: any;
  }
  
  export interface FlattenedPerson {
    id: string;
    knownName: string;
    givenName: string;
    familyName: string;
    fullName: string;
    fileName: string;
    gender: string;
    birthDate: string;
    birthCity: string;
    birthCountry: string;
    birthCityNow: string;
    birthCountryNow: string;
    birthContinent: string;
    birthLocationString: string;
    birthCityLatitude: string;
    birthCityLongitude: string;
    birthCountryLatitude: string;
    birthCountryLongitude: string;
    [key: string]: string;
  }