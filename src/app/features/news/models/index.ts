export type Position = {
  left: 'left';
  right: 'right';
};

export const CATEGORY_NEWS = [
  { name: 'news.categories.world', value: 'WORLD' },
  { name: 'news.categories.national', value: 'NATIONAL' },
  { name: 'news.categories.business', value: 'BUSINESS' },
  { name: 'news.categories.technology', value: 'TECHNOLOGY' },
  { name: 'news.categories.entertainment', value: 'ENTERTAINMENT' },
  { name: 'news.categories.sports', value: 'SPORTS' },
  { name: 'news.categories.science', value: 'SCIENCE' },
  { name: 'news.categories.health', value: 'HEALTH' },
];

export const ERROR_MESSAGES = {
  apiKeyDisabled: 'news.errors.apiKeyDisabled',
  apiKeyExhausted: 'news.errors.apiKeyExhausted',
  apiKeyInvalid: 'news.errors.apiKeyInvalid',
  apiKeyMissing: 'news.errors.apiKeyMissing',
  parameterInvalid: 'news.errors.parameterInvalid',
  parametersMissing: 'news.errors.parametersMissing',
  rateLimited: 'news.errors.rateLimited',
  sourcesTooMany: 'news.errors.sourcesTooMany',
  sourceDoesNotExist: 'news.errors.sourceDoesNotExist',
  unexpectedError: 'news.errors.unexpectedError',
};

export interface NewsError {
  error: Error;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}
interface Error {
  status: string;
  code: string;
  message: string;
}

export const COUNTRIES = [
  { name: 'news.countries.emirate', value: 'ae' },
  { name: 'news.countries.argentina', value: 'ar' },
  { name: 'news.countries.austria', value: 'at' },
  { name: 'news.countries.australia', value: 'au' },
  { name: 'news.countries.belgium', value: 'be' },
  { name: 'news.countries.bulgaria', value: 'bg' },
  { name: 'news.countries.brazil', value: 'br' },
  { name: 'news.countries.canada', value: 'ca' },
  { name: 'news.countries.switzerland', value: 'ch' },
  { name: 'news.countries.china', value: 'cn' },
  { name: 'news.countries.colombia', value: 'co' },
  { name: 'news.countries.cuba', value: 'cu' },
  { name: 'news.countries.czech', value: 'cz' },
  { name: 'news.countries.germany', value: 'de' },
  { name: 'news.countries.egypt', value: 'eg' },
  { name: 'news.countries.france', value: 'fr' },
  { name: 'news.countries.united-kingdom', value: 'gb' },
  { name: 'news.countries.greece', value: 'gr' },
  { name: 'news.countries.hong-kong', value: 'hk' },
  { name: 'news.countries.hungary', value: 'hu' },
  { name: 'news.countries.indonesia', value: 'id' },
  { name: 'news.countries.ireland', value: 'ie' },
  { name: 'news.countries.israel', value: 'il' },
  { name: 'news.countries.india', value: 'in' },
  { name: 'news.countries.italy', value: 'it' },
  { name: 'news.countries.japan', value: 'jp' },
  { name: 'news.countries.korea', value: 'kr' },
  { name: 'news.countries.lithuania', value: 'lt' },
  { name: 'news.countries.latvia', value: 'lv' },
  { name: 'news.countries.morocco', value: 'ma' },
  { name: 'news.countries.mexico', value: 'mx' },
  { name: 'news.countries.malaysia', value: 'my' },
  { name: 'news.countries.nigeria', value: 'ng' },
  { name: 'news.countries.netherlands', value: 'nl' },
  { name: 'news.countries.norway', value: 'no' },
  { name: 'news.countries.new-zealand', value: 'nz' },
  { name: 'news.countries.philippines', value: 'ph' },
  { name: 'news.countries.poland', value: 'pl' },
  { name: 'news.countries.portugal', value: 'pt' },
  { name: 'news.countries.romania', value: 'ro' },
  { name: 'news.countries.serbia', value: 'rs' },
  { name: 'news.countries.russia', value: 'ru' },
  { name: 'news.countries.saudi-arabia', value: 'sa' },
  { name: 'news.countries.sweden', value: 'se' },
  { name: 'news.countries.singapore', value: 'sg' },
  { name: 'news.countries.slovenia', value: 'si' },
  { name: 'news.countries.slovakia', value: 'sk' },
  { name: 'news.countries.thailand', value: 'th' },
  { name: 'news.countries.turkey', value: 'tr' },
  { name: 'news.countries.republic-china', value: 'tw' },
  { name: 'news.countries.ukraine', value: 'ua' },
  { name: 'news.countries.united-states', value: 'us' },
  { name: 'news.countries.venezuela', value: 've' },
  { name: 'news.countries.south-africa', value: 'za' },
];

export interface ArticleReq {
  q: string;
  from?: string;
  to?: string;
}
export interface ArticlesResp {
  status: string;
  totalResults: number;
  data: News[];
}

export interface News {
  title: string;
  published_datetime_utc: string;
  link: string;
  photo_url?: string;
  source_favicon_url?: string;
  source_logo_url?: string;
  source_url: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  link: string;
  media: string;
  published_date: string;
  summary: string;
  clean_url: string;
}

interface Source {
  id: string;
  name: string;
}

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: number;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  representative?: Representative;
}
