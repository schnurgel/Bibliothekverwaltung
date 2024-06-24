import {Book} from "./book-model";

export interface Borrow {
  borrowId: number;
  borrowDate: string;
  returnDate: string;
  book: Book;
}
