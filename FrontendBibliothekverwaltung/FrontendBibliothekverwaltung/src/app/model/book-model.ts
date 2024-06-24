import {Author} from "./author-model";
import {Category} from "./category-model";

export interface Book {
  borrowed: boolean;
  buchId?:number,
  author?: Author,
  category?: Category,
  title?: string,
  publishDate?: string,
  description?: string,
  imgPath?: string
}
