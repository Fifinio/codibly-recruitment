export interface IProduct {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
export interface IProductsMeta {
  page?: number;
  per_page: number;
  total?: number;
  total_pages?: number;
}
