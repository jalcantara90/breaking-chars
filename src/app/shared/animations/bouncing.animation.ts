import { trigger, transition, style, animate, keyframes } from "@angular/animations";

export const bouncingLeft = trigger('bouncingLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-50%)' }),
    animate('400ms ease-in-out',
      keyframes([
        style({ transform: 'translateX(5%)', offset: 0.4 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ])
    )
  ])
]);

export const bouncingRight = trigger('bouncingRight', [
  transition(':enter', [
    style({ transform: 'translateX(50%)' }),
    animate('400ms ease-in-out',
      keyframes([
        style({ transform: 'translateX(-5%)', offset: 0.4 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ])
    )
  ])
]);
