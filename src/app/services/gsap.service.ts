import { Injectable } from '@angular/core';
import { gsap, Power2, Elastic } from 'gsap/all';
@Injectable({
  providedIn: 'root',
})
export class GsapService {
  /*---=| GSAP v3 Animation Engine |=---*/

  /*--=| Fade From |=--*/
  public fFadeFrom(e, tym, alfa, dlay) {
    gsap.from(e, { duration: tym, opacity: alfa, ease: Power2, delay: dlay });
  }
}
