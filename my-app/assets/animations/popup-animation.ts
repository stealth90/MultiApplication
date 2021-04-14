import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const popupAnimation = trigger('openPopup', [
  state(
    'visible',
    style({
      transform: 'translateX(0)',
      opacity: 1,
    })
  ),
  transition('void => *', [
    style({ transform: 'translateX(50%)', opacity: 0 }),
    animate('300ms ease-out'),
  ]),
  transition('* => void', [
    animate(
      '300ms ease-in',
      style({
        opacity: 0,
        transform: 'translateX(50%)',
      })
    ),
  ]),
]);
