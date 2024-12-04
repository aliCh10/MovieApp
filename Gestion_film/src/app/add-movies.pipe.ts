import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addMovies',
  standalone: true
})
export class AddMoviesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
