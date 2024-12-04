import { AddMoviesPipe } from './add-movies.pipe';

describe('AddMoviesPipe', () => {
  it('create an instance', () => {
    const pipe = new AddMoviesPipe();
    expect(pipe).toBeTruthy();
  });
});
