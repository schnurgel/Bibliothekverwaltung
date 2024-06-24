import {Component, inject, OnInit} from '@angular/core';
import {Book} from "../model/book-model";
import {HttpService} from "../service/http.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {routes} from "../app.routes";

@Component({
  selector: 'app-bookdetails',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './bookdetails.component.html',
  styleUrl: './bookdetails.component.css'
})
export class BookdetailsComponent implements OnInit{

  book: Book | undefined ;


  httpService: HttpService = inject(HttpService)
  form: FormGroup;
  reviewForm: FormGroup;
  rating: number = 0;
  averageRating: number = 0;
  avgThingis: any ;
  reviewCount: any;


  constructor(private router: ActivatedRoute) {
    this.form = new FormGroup({
      'borrowDate': new FormControl(),
      'returnDate': new FormControl()
    })
    this.reviewForm = new FormGroup({
      'borrowDate': new FormControl(),
      'returnDate': new FormControl()
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe((value) => {
      this.httpService.getBook(this.router.snapshot.params['id']).subscribe((data) => {
        console.log(data)
        this.book = data;
      }, error => {
        console.log(error)
      });
    });
  }

  //AUSBORGEN

  borrowBook() {
    if (this.book) {
      this.httpService.borrowBook(this.book.buchId, this.form.value.borrowDate, this.form.value.returnDate).subscribe(() => {
        this.book!.borrowed = true;
      });
    }
  }

  returnBook() {
    if (this.book) {
      this.httpService.returnBook(this.book.buchId).subscribe(() => {
        this.book!.borrowed = false;
      });
    }
  }

  isBorrowed() {
    return this.book?.borrowed || false;
  }

  // RATINGS

  getAverageRating(): void {
    this.httpService.getAverageRating(this.book?.buchId).subscribe(data => {
      console.log(data)
      this.avgThingis = data.entity.map((entry: any) => ({
        bookId: entry[0],
        ratingCounts: entry[1],
        avgStars:entry[2]
      }));
      console.log(this.avgThingis)
      this.averageRating = this.avgThingis[0].avgStars;
      this.reviewCount = this.avgThingis[0].ratingCounts;
      console.log(this.averageRating)
      /*this.reviewCount = data.reviewCount;*/
    });
  }

  setRating(rating: number): void {
    this.rating = rating;
  }

  submitReview(): void {
    if (this.rating > 0) {
      this.httpService.createReview(this.book?.buchId, this.rating).subscribe(() => {
        this.getAverageRating(); // Durchschnitt aktualisieren
      });
    }
  }

}
