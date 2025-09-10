import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IJoke, IJokeResponse } from '../models/joke.interface';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private readonly API_ENDPOINT = 'https://v2.jokeapi.dev/';

  private readonly http = inject(HttpClient);

  public jokes: BehaviorSubject<IJoke[]> = new BehaviorSubject<IJoke[]>([]);

  // API DOCS: https://v2.jokeapi.dev/?ref=freepublicapis.com#try-it
  private getJokes(): Observable<IJokeResponse> {
    return this.http
      .get<IJokeResponse>(
        `${this.API_ENDPOINT}joke/Programming,Spooky,Christmas?amount=10&safe-mode`,
      )
      .pipe(
        map((response: IJokeResponse) => {
          if (!response.error) {
            response.jokes = response.jokes.map((joke) => ({
              ...joke,
              destacado: false,
            }));
          }
          return response;
        }),
      );
  }

  // FUNCION PARA INICIALIZAR VALORES DE JOKES
  public initializeData(): void {
    const currentJokes: IJoke[] = JSON.parse(
      localStorage.getItem('jokes') as string,
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
          this.setLocalData(response.jokes);
        },
      });
      return;
    }

    // DE OTRA MANERA SE INTERACTUA CON LA INFORMACION LOCAL REGISTRADA
    this.jokes.next(currentJokes);
  }

  //FUNCION PARA SETTEAR DATOS LOCALES
  private setLocalData(jokes: IJoke[]): void {
    localStorage.setItem('jokes', JSON.stringify(jokes));
  }

  private getLocalData(): IJoke[] {
    return JSON.parse(localStorage.getItem('jokes') as string);
  }

  public deleteJoke(jokeId: number): void {
    const filteredJokes = this.jokes.value.filter((joke) => joke.id != jokeId);
    this.jokes.next(filteredJokes);
    this.setLocalData(filteredJokes);
  }

  public editJoke(joke: IJoke): void {
    const jokeIdx = this.jokes.value.findIndex((item) => item.id == joke.id);
    this.jokes.value[jokeIdx] = joke;
    this.jokes.next([...this.jokes.value]);
    this.setLocalData(this.jokes.value);
  }

  saveJoke(joke: IJoke): void {
    this.jokes.value.push(joke);
    this.setLocalData(this.jokes.value);
  }

  getJoke(id: number): IJoke | undefined {
    const currentJokes = this.getLocalData();
    return currentJokes.find((joke: IJoke) => joke.id == id);
  }
}
