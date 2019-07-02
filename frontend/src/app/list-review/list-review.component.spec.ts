import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReviewComponent } from './list-review.component';

describe('ListReviewComponent', () => {
  let component: ListReviewComponent;
  let fixture: ComponentFixture<ListReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
