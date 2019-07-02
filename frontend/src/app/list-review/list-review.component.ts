import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from '../auth/auth-http.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer'
import * as UIActions from '../shared/store/ui/ui.actions';

export interface Serving {
  id: number;
  name: string;
}
@Component({
  selector: 'list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {
  reviews: any=[];
  servings: Serving[] = [
    {id: 1, name:"Draft"},
    {id: 2, name: "Cask"},
    {id: 3, name: "Bottle"},
    {id: 4, name: "Can"}
  ];
  constructor(private store: Store<fromRoot.AppState>,
    private httpService: AuthHttpService,
    private router: Router) { }

  ngOnInit() {
    this.httpService.getReviews().subscribe(
      (response)=>{
        this.reviews = response
      },
      (error)=>{
        this.store.dispatch(new UIActions.SnackBar(`Error Occured: ${error.message}`))
        this.router.navigate(['/']);
      }
    );
  }
}
