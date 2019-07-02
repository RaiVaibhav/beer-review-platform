import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';

//components

import { ChangePasswordComponent } from './password/change/change-password.component';
import { AuthComponent } from './auth.component';
import { ResetConfirmComponent } from './password/reset/confirm/reset-confirm.component';
import { VerifyComponent } from './verify-account/verify.component';
import { ResetPasswordComponent } from './password/reset/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

//modules
import { AppRoutingModule } from '../modules/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { CoreModule } from '../modules/core.module';

//services
import { AuthHttpService } from './auth-http.service';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AuthComponent,
    ResetConfirmComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CoreModule
  ],
  providers: [AuthHttpService],
})
export class AuthModule {}
