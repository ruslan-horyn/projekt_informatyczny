import { FilterKeys } from './helpers.type';

export interface Vacancy {
  id: string;
  name: string;
  end?: string;
  start: string;
  salary: string;
  type: string;
  job: string;
  employee: string;
  currency: string;
}

export type VacancyPayload = FilterKeys<Vacancy, 'id'>;
