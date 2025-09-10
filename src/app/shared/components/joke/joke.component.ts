import { Component, inject, input, signal } from '@angular/core';
import { IJoke } from '../../../core/models/joke.interface';
import { AuthService } from '../../../core/services/auth.service';
import { IUser } from '../../../core/models/user.interface';

@Component({
  selector: 'app-joke',
  imports: [],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.css',
})
export class JokeComponent {
  private readonly authService = inject(AuthService);
  public user = signal(this.authService.user());
  joke = input<IJoke>();
  destacado = input<boolean>();
}
