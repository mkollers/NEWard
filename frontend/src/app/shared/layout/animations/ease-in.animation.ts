import { animate, query, style, transition, trigger } from '@angular/animations';

export const easeInAnimation = trigger('easeInAnimation', [
    transition('* <=> *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(':leave', [style({ opacity: 1 }), animate('0s ease-in', style({ display: 'none' }))], { optional: true }),
        query(':enter', [style({ opacity: 0 }), animate('400ms ease-in', style({ opacity: 1 }))], { optional: true })
    ])
]);
