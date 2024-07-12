export interface ProductId {
  id: string;
}
export interface ProductCreate {
  title: string;
  price: number;
  quantity: number;
  description: string;
  image?: string;
  category?: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  source_id: number | undefined;
  source: string | undefined;
}
export interface Product extends ProductId, ProductCreate {

}
