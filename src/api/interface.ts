export interface ICountry {
  id: number;
  name: string;
  capital: string | null;
  region: string | null;
  population: number;
  currency_code: string | null;
  exchange_rate: number | null;
  estimated_gdp: number | null;
  flag_url: string | null;
}

export interface ICountryResponseDto {
  name: string;
  capital: string | null;
  region: string | null;
  population: number;
  currency_code: string | null;
  exchange_rate: number | null;
  estimated_gdp: number | null;
  flag_url: string | null;
}

export interface ICountryApiResponse {
  name: string;
  capital: string | null;
  region: string | null;
  population: number;
  currencies: [
    {
      code: string;
      name: string;
      symbol: string;
    }
  ];
  flag: string | null;
  independent: boolean;
}

export interface ICountryRate {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: {
    [key: string]: number;
  };
}

export interface GetCountriesQuery {
  region?: string;
  currency?: string;
  sort?: string;
}