import { style } from '@angular/animations';

export const slideOutLeft = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(-25%, 0, 0)', offset: 1 }),
];
export const slideOutRight = [
  style({ transform: 'translate3d(-25%, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(0%, 0, 0)', offset: 1 }),
];

export const showButton = [
  style({
    opacity: 0,
    transform: 'translate3d(0, 0, 0)',
    display: 'none',
    offset: 0,
  }),
  style({
    opacity: 1,
    display: 'block',
    transform: 'translate3d(90%, 0, 0)',
    offset: 1,
  }),
];
export const hideButton = [
  style({
    opacity: 1,
    display: 'block',
    transform: 'translate3d(90%, 0, 0)',
    offset: 0,
  }),
  style({
    opacity: 0,
    display: 'none',
    transform: 'translate3d(0, 0, 0)',
    offset: 1,
  }),
];
