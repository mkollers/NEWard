import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('create an instance', () => {
    // Assert
    expect(pipe).toBeTruthy();
  });

  const cases = [
    { email: undefined, expected: '' },
    { email: 'm.kollers@vertical.de', expected: 'MK' },
    { email: 'mail@markuskollers.de', expected: 'M' },
    { email: 'benjamin.bittmann@bodylife-medien.com', expected: 'BB' }
  ];
  for (const c of cases) {
    it(`should return ${c.expected}`, () => {
      // Act
      const result = pipe.transform(c.email);

      // Assert
      expect(result).toBe(c.expected);
    });
  }
});
