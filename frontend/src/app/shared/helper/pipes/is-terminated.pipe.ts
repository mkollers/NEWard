import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isTerminated'
})
export class IsTerminatedPipe implements PipeTransform {

  transform(condition: 'before' | 'during' | 'after'): boolean {
    const today = new Date();
    const start = new Date('2022-09-01T00:00:00.000Z');
    const end = new Date('2022-10-30T21:59:59.000Z');

    const started = today > start;
    const ended = today > end;
    if (condition === 'before') {
      return !started;
    } else if (condition === 'after') {
      return ended;
    } else {
      if (localStorage.getItem('debug') === 'true') return true;
      return started && !ended;
    }
  }

}
