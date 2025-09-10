import { Component } from '@angular/core';
import { LoginFormComponent } from '../../../shared/forms/login-form/login-form.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
