import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(email: string | undefined): string {
    if (!email) return '';
    const prefix = email.split('@')[0];

    let result = '';
    for (const part of prefix.split('.')) {
      if (!part.length) continue;
      result += part[0].toUpperCase();
    }

    // Forget about middlenames of there is more than one
    if (result.length > 3) {
      return result[0] + result[result.length - 1];
    }

    return result;
  }
}
