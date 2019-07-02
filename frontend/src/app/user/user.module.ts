import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';

import { AppRoutingModule } from '../modules/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { CoreModule } from '../modules/core.module';



@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CoreModule
  ],
  providers: [],
})
export class UserModule {}
