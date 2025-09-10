import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { IJoke } from '../../../core/models/joke.interface';
import { AuthService } from '../../../core/services/auth.service';
import { JokesService } from '../../../core/services/jokes.service';

@Component({
  selector: 'app-joke',
  imports: [SwalDirective, CommonModule, RouterLink],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.css',
})
export class JokeComponent {
  joke = input.required<IJoke>();
  destacado = input<boolean>(false);

  private readonly authService = inject(AuthService);
  private readonly jokesService = inject(JokesService);

  public user = signal(this.authService.user());

  handleDeleteJoke(): void {
    this.jokesService.deleteJoke(this.joke()?.id as number);
  }

  handleAddDestacado(): void {
    this.joke().destacado = !this.joke().destacado;
    this.jokesService.editJoke(this.joke());
  }
}
