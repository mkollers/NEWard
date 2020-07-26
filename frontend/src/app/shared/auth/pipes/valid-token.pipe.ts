import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { Token } from '../models/token';

@Pipe({
  name: 'validToken'
})
export class ValidTokenPipe implements PipeTransform {

  transform(value: Token | undefined): boolean {
    if (!value) return false;

    const now = moment();
    const created = moment(value.created);
    if (now.diff(created, 'hours') < 4) return true;

    const updated = moment(value.updated);
    if (value.updated && now.diff(updated, 'hours') < 4) return true;

    return false;
  }

}
