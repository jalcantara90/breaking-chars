import { trigger, transition, query, style, stagger, animate } from "@angular/animations";

export const slideInRightList = trigger('slideInRightList', [
  transition(':enter', [
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        stagger('150ms', [
          animate(
            '300ms ease-in',
            style({ transform: 'translateX(0)', opacity: 1 })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);
