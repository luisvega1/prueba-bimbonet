import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JokesService } from '../../services/jokes.service';

@Component({
  selector: 'app-home',
  imports: [],
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
