import { animate, state, style, transition, trigger } from '@angular/animations';

export const easeIn = trigger('easeIn', [
    state('void', style({ opacity: 0 })),
    state('*', style({ opacity: 1 })),
    transition(':enter', animate(`400ms ease-out`)),
    transition(':leave', animate(`400ms ease-in`))
]);
