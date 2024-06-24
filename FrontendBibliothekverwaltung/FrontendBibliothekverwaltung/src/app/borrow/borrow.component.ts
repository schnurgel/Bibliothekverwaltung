import { Component } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {Book} from "../model/book-model";
import {HttpService} from "../service/http.service";
import {Borrow} from "../model/borrow-model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'borrow',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf
  ],
  templateUrl: './borrow.component.html',
  styleUrl: './borrow.component.css'
})
export class BorrowComponent{
  borrows: Borrow[] = [];


  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.httpService.getAllBorrows().subscribe((data: Borrow[]) => {
      console.log("this is data"+data)
      this.borrows = data;
    });
  }
}
