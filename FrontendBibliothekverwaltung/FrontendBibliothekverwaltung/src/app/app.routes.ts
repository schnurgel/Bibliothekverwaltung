import { Routes } from '@angular/router';
import {BookOverviewComponent} from "./book-overview/book-overview.component";
import {ToplistComponent} from "./toplist/toplist.component";
import {BorrowComponent} from "./borrow/borrow.component";
import {BookdetailsComponent} from "./bookdetails/bookdetails.component";

export const routes: Routes = [
  { path: 'borrow', component: BorrowComponent },
  { path: 'toplist', component: ToplistComponent },
  { path: 'book-overview', component: BookOverviewComponent },
  { path: 'book-overview/:id', component: BookdetailsComponent},
  { path: '', component: BookOverviewComponent },
  { path: '**', component: BookOverviewComponent },
];
