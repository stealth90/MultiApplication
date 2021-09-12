import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const installAppAnimation = trigger('openInstallButton', [
  state(
    'visible',
    style({
      transform: 'translate(-50%, 0)',
      opacity: 1,
    })
  ),
  transition('void => *', [
    style({ transform: 'translate(-50%, 50%)', opacity: 0 }),
    animate('300ms ease-out'),
  ]),
  transition('* => void', [
    animate(
      '300ms ease-in',
      style({
        opacity: 0,
        transform: 'translate(-50%, 50%)',
      })
    ),
  ]),
]);
