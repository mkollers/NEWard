import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isTerminated'
})
export class IsTerminatedPipe implements PipeTransform {

  transform(condition: 'started' | 'ended' | 'both'): boolean {
    const today = new Date();
    const start = new Date('2020-07-26T22:00:00.000Z');
    const end = new Date('2020-10-29T22:00:00.000Z');

    const started = today > start;
    const ended = today < end;
    if (condition === 'started') {
      return started;
    } else if (condition === 'ended') {
      return ended;
    } else {
      return started && ended;
    }
  }

}
