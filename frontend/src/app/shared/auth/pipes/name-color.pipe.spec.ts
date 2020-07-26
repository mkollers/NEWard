import { NameColorPipe } from './name-color.pipe';

describe('NameColorPipe', () => {
  let pipe: NameColorPipe;

  beforeEach(() => {
    pipe = new NameColorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  const cases = [
    { name: 'Markus Kollers', color: 'hsl(-203, 30%, 80%)' },
    { name: 'Lukas Macek', color: 'hsl(257, 30%, 80%)' },
    { name: 'Cederic Privat', color: 'hsl(113, 30%, 80%)' },
    { name: undefined, color: 'hsl(85, 30%, 80%)' }
  ];

  for (const c of cases) {
    it(`should return ${c.color} for ${c.name}`, () => {
      // Act
      const color = pipe.transform(c.name);

      // Assert
      expect(color).toBe(c.color);
    });
  }
});
