export interface Job {
  id: string;
  name: string;
  description: string;
  phone: string;
}

export interface JobWithAddress extends Job {
  address: string;
}
