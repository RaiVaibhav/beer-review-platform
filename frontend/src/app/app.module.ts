import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { AuthGuard } from './auth-guard.service';

import { reducers } from './store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/store/user.effects';
import { UIEffects } from './shared/store/ui/ui.effects';

import { MaterialModule } from './modules/material.module';
import { CoreModule } from './modules/core.module';
import { WorkflowSampleRemovemeComponent } from './workflow-sample-removeme/workflow-sample-removeme.component';
import { UserModule } from './user/user.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltDown, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';


import {CookieService} from 'angular2-cookie/services/cookies.service';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { httpInterceptorProviders } from './shared/http-interceptors/interceptor_index';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ListReviewComponent } from './list-review/list-review.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkflowSampleRemovemeComponent,
    HeaderComponent,
    CreateReviewComponent,
    ListReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    AuthModule,
    MaterialModule,
    CoreModule,
    FontAwesomeModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects, UIEffects]),
  ],
  providers: [CookieService, httpInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    library.add(faLongArrowAltDown);
    library.add(faLongArrowAltRight);
  }
}
