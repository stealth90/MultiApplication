import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
export const routeTransitionAnimations = trigger('routeChange', [
  transition('Home => Weather, Home => News', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('1s ease-out', style({ right: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('1s ease-out', style({ right: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('News => Weather', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(100%)' }),
          animate('1s ease-in-out', style({ transform: 'translateY(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('1.8s ease-in-out', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('300ms ease-in-out', style({ opacity: 0 })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)' }),
          animate('1s ease-in-out', style({ transform: 'translateY(-100%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
  transition('Weather => News', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(-100%)' }),
          animate('1s ease-in-out', style({ transform: 'translateY(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('1.8s ease-in-out', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)' }),
          animate('1s ease-in-out', style({ transform: 'translateY(100%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('300ms ease-in-out', style({ opacity: 0 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
  transition('Weather => Home, News => Home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('1s ease-out', style({ left: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('1s ease-out', style({ left: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
