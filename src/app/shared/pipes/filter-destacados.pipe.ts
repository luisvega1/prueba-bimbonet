import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDestacados',
})
export class FilterDestacadosPipe implements PipeTransform {
  transform<T extends { destacado?: boolean }>(
    items: T[] | null | undefined,
  ): T[] {
    if (!items) return [];
    return items.filter((item) => item.destacado === true);
  }
}
