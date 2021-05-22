import { trigger, transition, style, query, animateChild, animate, sequence, stagger, group } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition(() => true, [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
          }),
        ], { optional: true }),
        query(
          ':enter > *',
          style({ opacity: 0 }),
          { optional: true}
        ),
        query(':enter', style({ right: '-100%', opacity: 0 }), { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            animate('.2s ease-out', style({ right: '100%', opacity: 0 })),
            { optional: true }
          ),
          query(
            ':enter',
            animate('.5s ease-out', style({ right: '0%', opacity: 1 })),
            { optional: true }
          )
        ]),
        sequence([
          query(
            ':leave > *',
            [
              style({ transform: 'translateX(0%)', opacity: 1 }),
              animate(
                '0.2s ease-in-out',
                style({ transform: 'translateX(-100%)', opacity: 0 })
              ),
              style({ position: 'fixed' })
            ],
            { optional: true }
          ),
          query(
            ':enter > *',
            [
              style({
                transform: 'translateX(100%)',
                opacity: 0,
                position: 'static'
              }),
              animate(
                '0.5s ease-in-out',
                style({ transform: 'translateX(0%)', opacity: 1 })
              )
            ],
            { optional: true }
          )
        ])
      ]),
    ])
  ]
})
export class AppComponent {

  routing(routerOutlet: RouterOutlet) {
    return routerOutlet?.activatedRouteData?.animationState;
  }
}
