import { IsTerminatedPipe } from './is-terminated.pipe';

describe('IsTerminatedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsTerminatedPipe();
    expect(pipe).toBeTruthy();
  });
});
