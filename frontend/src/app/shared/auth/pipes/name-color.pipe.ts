import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameColor'
})
export class NameColorPipe implements PipeTransform {

  transform(value: string | undefined): unknown {
    return this.stringToHslColor(value || 'U', 30, 80);
  }

  stringToHslColor = (str: string, s: number, l: number) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }
}
