import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users.json');
  }

  public login(email: string, password: string) {
    this.getUsers().subscribe({
      next: (users: IUser[]) => {
        //buscamos el usuario con los datos ingresados en el form
        const foundUser = users.find(
          (user) => user.email == email && user.password == password,
        );

        //si no se encontro ningun usuario que coincida con los datos ingresados arrojamos un alert y forzamos salida de la funcion
        if (!foundUser) {
          alert('Verifica la información ingresada.');
          return;
        }

        //si encontramos el usuario e ingreso la contraseña correcta seteamos una nueva sesion
        this.setSession(foundUser);
        this.router.navigate(['/dashboard']);
      },
    });
  }

  public setSession(user: IUser): void {
    sessionStorage.setItem('session', JSON.stringify(user));
  }

  public removeCurrentSession(): void {
    sessionStorage.removeItem('session');
  }
}
