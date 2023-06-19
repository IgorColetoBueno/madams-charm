import { IProduct } from "./product";

export interface IProductResponse {
  data: IProduct[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
