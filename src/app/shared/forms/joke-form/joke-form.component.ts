import { Component, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { jokeValidator } from '../../validators/joke.validator';
import { JokesService } from '../../../core/services/jokes.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-joke-form',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './joke-form.component.html',
  styleUrl: './joke-form.component.css',
})
export class JokeFormComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly jokesService = inject(JokesService);
  private readonly router = inject(Router);

  jokeId = input<number | null>();
  editMode = signal<boolean>(false);

  jokeForm: FormGroup = this.formBuilder.group(
    {
      id: new FormControl(null),
      category: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      joke: new FormControl(null, Validators.minLength(20)),
      setup: new FormControl(null),
      delivery: new FormControl(null),
      destacado: new FormControl(false),
    },
    { validators: jokeValidator },
  );

  ngOnInit() {
    // si tenemos un id de input entramos en modo edicion del form
    if (this.jokeId()) {
      this.editMode.set(true);
      this.initializeFormEditMode();
    }
  }

  initializeFormEditMode(): void {
    const jokeData = this.jokesService.getJoke(this.jokeId() as number);
    if (jokeData) {
      const { id, category, destacado, type, joke, setup, delivery } = jokeData;
      this.jokeForm.setValue({
        id: id,
        category: category,
        destacado: destacado,
        type: type,
        joke: joke ?? null,
        setup: setup ?? null,
        delivery: delivery ?? null,
      });
    }
  }

  handleSubmitJoke(): void {
    if (this.editMode()) {
      this.handleEditJoke();
      return;
    }

    if (!this.jokeForm.get('id')?.value) {
      this.jokeForm.setValue({
        ...this.jokeForm.value,
        id: this.jokeForm.get('id')?.value ?? Number(Date.now().toString()),
      });
    }
    if (this.jokeForm.valid) {
      this.jokesService.saveJoke(this.jokeForm.value);
      this.router.navigate(['/dashboard']);
    }
  }

  handleEditJoke(): void {
    if (this.jokeForm.valid) {
      this.jokesService.editJoke(this.jokeForm.value);
      this.router.navigate(['/dashboard']);
    }
  }

  // funcion necesaria para validar el type seleccionado y limpiar cambios (si ya se habia ingresado algo) segun el type seleccionado
  handleTypeChange(): void {
    //si type es single limpiamos setup y delivery para que no haga conflicto al tener que registrar en el campo joke
    if (this.jokeForm.get('type')?.value == 'single') {
      this.jokeForm.setValue({
        ...this.jokeForm.value,
        setup: null,
        delivery: null,
      });
    } else if (this.jokeForm.get('type')?.value == 'twopart') {
      // en cambio si el type es twopart limpiamos el campo joke para que no haga conflicto con los campos necesarios para twopart
      this.jokeForm.setValue({ ...this.jokeForm.value, joke: null });
    }
  }
}
