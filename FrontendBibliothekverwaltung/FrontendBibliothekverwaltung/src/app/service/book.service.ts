import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Book} from "../model/book-model";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private subject: Subject<Book> = new BehaviorSubject({} as Book);

  constructor() { }
}
