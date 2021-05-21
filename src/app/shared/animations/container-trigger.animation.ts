import { trigger, transition, query, animateChild } from "@angular/animations";

export const conatinerTrigger = trigger('container', [
  transition(':enter, :leave', [
    query('@*', animateChild(), { optional: true })
  ])
]);
