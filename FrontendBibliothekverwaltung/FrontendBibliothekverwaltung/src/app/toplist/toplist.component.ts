import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpService} from "../service/http.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'toplist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './toplist.component.html',
  styleUrl: './toplist.component.css'
})
export class ToplistComponent {
  borrowForm: FormGroup;
  mostBorrowedBooks: any[] = [];

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.borrowForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.getMostBorrowedBooks();
  }

  getMostBorrowedBooks(): void {
    const {startDate, endDate} = this.borrowForm.value;
    this.httpService.getMostBorrowedBooks(startDate, endDate).subscribe(data => {
      this.mostBorrowedBooks = data.map((entry: any[]) => ({
        boki: entry[0],
        count: entry[1]
      }));
      console.log(data)
    });


  }

  onSubmit(): void {
    this.getMostBorrowedBooks();
  }
}
