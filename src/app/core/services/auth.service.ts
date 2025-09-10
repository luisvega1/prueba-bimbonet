import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);

  public user$: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  constructor() {
    const lang = JSON.parse(localStorage.getItem('lang') as string);
    this.translateService.use(lang);
  }

  private getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users.json');
  }

  public login(email: string, password: string) {
    const currentLang = this.translateService.getCurrentLang();

    this.getUsers().subscribe({
      next: (users: IUser[]) => {
        //buscamos el usuario con los datos ingresados en el form
        const foundUser = users.find(
          (user) => user.email == email && user.password == password,
        );

        //si no se encontro ningun usuario que coincida con los datos ingresados arrojamos un alert y forzamos salida de la funcion
        if (!foundUser) {
          alert(
            currentLang == 'es'
              ? 'Verifica la información ingresada.'
              : 'Please verify the entered information.',
          );
          return;
        }

        //si encontramos el usuario e ingreso la contraseña correcta seteamos una nueva sesion
        this.setSession(foundUser);
        this.router.navigate(['/dashboard']);
      },
    });
  }

  private setSession(user: IUser): void {
    sessionStorage.setItem('session', JSON.stringify(user));
    this.user$.next(user);
  }

  public removeCurrentSession(): void {
    sessionStorage.removeItem('session');
  }
}
