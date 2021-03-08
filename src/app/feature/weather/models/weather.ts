import * as moment from 'moment';
export interface Weather {
  coord: Coord;
  weather: Weathers[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherApp {
  prefetch: boolean;
  id: string;
  city: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  icon: string;
  flag: any;
  timezone: string;
  timestamp: moment.Moment;
  humidity: number;
}

interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Weathers {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}
