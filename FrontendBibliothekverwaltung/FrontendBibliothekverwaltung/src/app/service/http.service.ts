import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Book} from "../model/book-model";
import {Borrow} from "../model/borrow-model";
import {MonoTypeOperatorFunction, Observable, OperatorFunction, TruthyTypesOf} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  SERVER = 'http://localhost:8080/bibliothek/';
  http = inject(HttpClient)

  constructor() {
  }

  getAllBooks() {
    return this.http.get<Book[]>(this.SERVER + "getallbooks");
  }

  /*register(registration: Registration) {
    return this.http.post(this.SERVER + "register", registration);
  }*/
  getBook(idFromBook: any) {
    return this.http.get<Book>(this.SERVER + "getbook/" + idFromBook);
  }

  borrowBook(id: number | undefined, borrowDate: string | undefined, returnDate: string | undefined) {
    // @ts-ignore
    return this.http.post<Response>(this.SERVER + "borrowbook/" + id + "/" + borrowDate + "/" + returnDate);
  }

  getAllBorrows() {
    return this.http.get<Borrow[]>(this.SERVER + "getallborrows");
  }

  returnBook(buchId: number | undefined) {
    // @ts-ignore
    return this.http.post(this.SERVER + "returnbook/" + buchId);
  }

  getBooksByFilter(filter: string | undefined) {
    return this.http.get<Book[]>(this.SERVER + "getallbooksbyfilter/" + filter);
  }

  getMostBorrowedBooks(startDate?: string, endDate?: string): Observable<any> {
    return this.http.get(this.SERVER + "getmostborrowedbooks/" + startDate + "/" + endDate);
  }

  createReview(bookId: number | undefined, rating: number): Observable<any> {
    // @ts-ignore
    return this.http.post(this.SERVER +"createreview/" + bookId+ "/" + rating);
  }

  getAverageRating(bookId: number | undefined): Observable<any> {
    return this.http.get<number>(this.SERVER + "getreview/" + bookId );
  }
}
