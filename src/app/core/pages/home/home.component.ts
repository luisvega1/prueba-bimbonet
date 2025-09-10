import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { JokesService } from '../../services/jokes.service';
import { JokeComponent } from '../../../shared/components/joke/joke.component';

@Component({
  selector: 'app-home',
  imports: [JokeComponent, AsyncPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  private readonly jokesService = inject(JokesService);

  public jokes$ = this.jokesService.jokes;
  public destacados$ = this.jokesService.destacados;

  public user = signal(this.authService.user());

  constructor() {
    this.jokesService.initializeData();
  }
}
