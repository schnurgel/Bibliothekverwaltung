import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HttpService } from '../service/http.service';
import { Book } from '../model/book-model';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {filter} from "rxjs";
import {BookService} from "../service/book.service";

@Component({
  selector: 'book-overview',
  standalone: true,
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css'],
  imports: [
    NgForOf,
    RouterLink,
    FormsModule
  ],
  providers: [HttpService]
})
export class BookOverviewComponent implements OnInit {
  books: Book[] = [];
  filterCategory: string | undefined;
  filter: string = "";
  filteredBooks: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
      this.httpService.getAllBooks().subscribe((data: Book[]) => {
        console.log("this is data"+data)
        this.books = data;
        this.filteredBooks = this.books;
      });
  }

  /*onSearchKeyup(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      (book.title.toLowerCase().includes(searchText)|| false ||
      (book.author?.vorname.toLowerCase().includes(searchText) || false) ||
      (book.author?.nachname.toLowerCase().includes(searchText) || false) ||
      (book.category?.name.toLowerCase().includes(searchText) || false)
    );
  }*/
  onFilterChange() {
    this.filteredBooks = [];
    this.books.forEach((book) => {
      if(book.title?.toLowerCase().includes(this.filter.toLowerCase())||book.author?.nachname?.toLowerCase().includes(this.filter.toLowerCase())||book.category?.name?.toLowerCase().includes(this.filter.toLowerCase())) {
        this.filteredBooks.push(book)
      }
    })
  }
}
