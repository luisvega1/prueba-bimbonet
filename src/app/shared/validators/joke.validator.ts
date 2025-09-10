import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const jokeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const type = control.get('type')?.value;
  const joke = control.get('joke')?.value;
  const setup = control.get('setup')?.value;
  const delivery = control.get('delivery')?.value;

  // cuando el type seleccionado es single, validamos que el input que se muestra tenga contenido, es decir se vuelve obligatorio
  if (type === 'single' && !joke) {
    return { bromaRequired: 'El campo broma es requerido.' };
  }

  //cuando el tpye es twopart validamos que ambos inputs habilitados tengan contenido
  if (type === 'twopart' && (!setup || !delivery)) {
    return { twopartRequired: 'El campo iniciador y gracia son requeridos.' };
  }

  return null; // válido
};
