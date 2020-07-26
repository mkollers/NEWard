import { ValidTokenPipe } from './valid-token.pipe';

describe('ValidTokenPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidTokenPipe();
    expect(pipe).toBeTruthy();
  });
});
