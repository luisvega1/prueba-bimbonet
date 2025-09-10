import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IJoke, IJokeResponse } from '../models/joke.interface';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private readonly API_ENDPOINT = 'https://v2.jokeapi.dev/';

  private readonly http = inject(HttpClient);

  public jokes: BehaviorSubject<IJoke[]> = new BehaviorSubject<IJoke[]>([]);
  public destacados: BehaviorSubject<IJoke[]> = new BehaviorSubject<IJoke[]>(
    [],
  );

  // API DOCS: https://v2.jokeapi.dev/?ref=freepublicapis.com#try-it
  private getJokes(): Observable<IJokeResponse> {
    return this.http.get<IJokeResponse>(
      `${this.API_ENDPOINT}joke/Programming,Spooky,Christmas?amount=10?safe-mode?lang=es`,
    );
  }

  // FUNCION PARA INICIALIZAR VALORES DE JOKES Y DESTACADOS
  public initializeData(): void {
    const currentJokes: IJoke[] = JSON.parse(
      localStorage.getItem('jokes') as string,
    );
    const currentDestacados: IJoke[] = JSON.parse(
      localStorage.getItem('destacados') as string,
    );

    //SI AUN NO INICIALIZAMOS DATOS DE JOKES Y DESCTACADOS
    if (!currentJokes) {
      //INICIALIZAMOS JOKES
      this.getJokes().subscribe({
        next: (response: IJokeResponse) => {
          if (response.error) {
            alert(response.message);
            return;
          }
          this.jokes.next(response.jokes);
          this.setLocalData(response.jokes, 'jokes');
        },
      });

      //INICIALIZAMOS DESTACADOS EN ARRAY VACIO
      localStorage.setItem('destacados', JSON.stringify([]));
      return;
    }

    // DE OTRA MANERA SE INTERACTUA CON LA INFORMACION LOCAL REGISTRADA
    this.jokes.next(currentJokes);
    this.destacados.next(currentDestacados);
  }

  //FUNCION PARA SETTEAR DATOS LOCALES
  private setLocalData(jokes: IJoke[], dataKey: string): void {
    let currentLocalData: IJoke[] = JSON.parse(
      localStorage.getItem(dataKey) as string,
    );

    if (!currentLocalData) {
      currentLocalData = jokes;
    } else {
      currentLocalData = currentLocalData.concat(jokes);
    }

    localStorage.setItem(dataKey, JSON.stringify(currentLocalData));
  }
}
