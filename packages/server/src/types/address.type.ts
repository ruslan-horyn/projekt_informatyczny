export interface Address {
  id: string;
  house: string;
  local?: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  region?: string; // województwo
  district?: string; // gmina
}
