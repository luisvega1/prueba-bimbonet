import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { JokesService } from '../../services/jokes.service';
import { JokeComponent } from '../../../shared/components/joke/joke.component';
import { IJoke } from '../../models/joke.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';
import { FilterDestacadosPipe } from '../../../shared/pipes/filter-destacados.pipe';

@Component({
  selector: 'app-home',
  imports: [
    JokeComponent,
    AsyncPipe,
    RouterLink,
    CommonModule,
    FormsModule,
    TranslatePipe,
    FilterDestacadosPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  private readonly jokesService = inject(JokesService);

  public jokes$ = this.jokesService.jokes;

  public user$ = this.authService.user$;

  public filtroCategoria = signal<string>('all');
  public filtroAlfabeticoActivo = signal<boolean>(false);
  public jokesFiltrados = signal<IJoke[]>([]);

  constructor() {
    this.jokesService.initializeData();
    this.initializeFilteredJokes();
  }

  private initializeFilteredJokes(): void {
    this.jokes$.subscribe((jokes) => {
      this.filtarJokes(jokes);
    });
  }

  public handleCambioCategoria(event: Event): void {
    const categoria = (event.target as HTMLSelectElement).value;
    this.filtroCategoria.set(categoria);
    this.jokes$.subscribe((jokes) => {
      this.filtarJokes(jokes);
    });
  }

  public handleOrdenarAlfabetico(): void {
    this.filtroAlfabeticoActivo.set(!this.filtroAlfabeticoActivo());
    this.jokes$.subscribe((jokes) => {
      this.filtarJokes(jokes);
    });
  }

  private filtarJokes(jokes: IJoke[]): void {
    let filtered = [...jokes];

    // se hace el filtrado por categoria seleccionada
    if (this.filtroCategoria() !== 'all') {
      filtered = filtered.filter(
        (joke) => joke.category === this.filtroCategoria(),
      );
    }

    // orden alfabetico del campo joke en caso de type single
    // o por setup y delivery en caso de tpye twopart
    if (this.filtroAlfabeticoActivo()) {
      filtered = filtered.sort((a, b) => {
        const textA =
          a.type === 'single'
            ? a.joke || ''
            : `${a.setup || ''} ${a.delivery || ''}`;
        const textB =
          b.type === 'single'
            ? b.joke || ''
            : `${b.setup || ''} ${b.delivery || ''}`;

        // metodo de strings parar strings
        // docs: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
        return textA.localeCompare(textB);
      });
    }

    this.jokesFiltrados.set(filtered);
  }
}
