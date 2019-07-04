import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from '../auth/auth-http.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer'
import * as UIActions from '../shared/store/ui/ui.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlavorsValidators } from './flavors.validators'
import { Review } from '../auth/models/Review.model';

export interface Common {
  id: number;
  name: string;
}
@Component({
  selector: 'create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  review_submit: Review;
  ReviewForm: FormGroup;
  flavorsList = []
  bears: any = [];
  servings: Common[] = [
    {id: 1, name:"Draft"},
    {id: 2, name: "Cask"},
    {id: 3, name: "Bottle"},
    {id: 4, name: "Can"}
  ];
  ratings: Common[] = [
    {id: 0, name: "No rating"},
    {id: 1, name: "Bad"},
    {id: 2, name: "Satisfactory"},
    {id: 3, name: "Good"},
    {id: 4, name: "Very Good"},
    {id: 5, name: "Extremely Statisfied"}
  ]
  constructor(private store: Store<fromRoot.AppState>,
    private httpService: AuthHttpService,
    private router: Router) { }

  ngOnInit() {
    this.httpService.getBears().subscribe(
      (response)=>{
        this.bears = response
      },
      (error)=>{
        this.store.dispatch(new UIActions.SnackBar(`Error Occured: ${error.message}`))
        this.router.navigate(['/']);
      }
    );
    this.ReviewForm = new FormGroup({
      'bear': new FormControl('', Validators.required),
      'brewername': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.compose(
        [Validators.min(0), Validators.required])
      ),
      'rating': new FormControl('', Validators.required),
      'serving': new FormControl('', Validators.required),
      'flavors': new FormControl('',
        FlavorsValidators.flavorlistEmpty(this)
      ),
    });
  }
  addFlavor($event) {
    $event.stopPropagation();
    const tag = this.ReviewForm.controls.flavors.value;
    if (this.flavorsList.indexOf(tag) < 0) {
      this.flavorsList.push(tag);
    }
    this.ReviewForm.controls.flavors.reset('');
  }
  removeFlavor($event, flavorName: string) {
    $event.stopPropagation();
    this.flavorsList = this.flavorsList.filter(tag => tag !== flavorName);
    this.ReviewForm.controls.flavors.reset('');
  }
  onSubmit(){
    let ReviewForm = this.ReviewForm;
    this.review_submit = new Review(
      ReviewForm.value.bear,
      ReviewForm.value.brewername,
      ReviewForm.value.price,
      ReviewForm.value.rating,
      ReviewForm.value.serving,
      this.flavorsList
    )
    if (ReviewForm.valid){
      this.httpService.createReview(this.review_submit).subscribe(
        (response)=>{
          this.store.dispatch(new UIActions.SnackBar(`Review created sucessfully`))
        },
        (error)=>{
          // this.store.dispatch(new UIActions.SnackBar(`Error Occured: ${error.message}`))
          // this.router.navigate(['/']);
        }
      );
    }else{
      this.store.dispatch(new UIActions.SnackBar(`Please enter the valid values`))
    }

  }//onSubmit
}
