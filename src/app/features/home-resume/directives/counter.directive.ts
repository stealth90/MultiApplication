import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appCounter]',
})
export class CounterDirective implements OnInit, OnDestroy {
  router$: Subscription;
  @Input() digit: number;
  @Input() id: number;
  @Input() duration: number;
  @Input() steps: number;
  @Input() delay: number;
  constructor(private el: ElementRef, private router: Router) {
    this.router$ = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd && event.url === '/#fivePage'
        )
      )
      .subscribe(() => {
        this.el.nativeElement.children[0].textContent = '';
        this.animateCount();
      });
  }
  ngOnInit(): void {
    this.animateCount();
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }

  animateCount(): void {
    if (!this.duration) {
      this.duration = 1000;
    }
    if (!this.delay) {
      this.delay = 200;
    }

    if (typeof this.digit === 'number') {
      setTimeout(
        () => this.counterFunc(this.digit, this.duration, this.el),
        this.id * this.delay
      );
    }
  }

  counterFunc(endValue: number, durationMs: number, element: ElementRef): void {
    if (!this.steps) {
      this.steps = 12;
    }

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    const step = () => {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;
      element.nativeElement.children[0].textContent =
        Math.abs(Math.floor(currentValue)) + '%';
      if (Math.floor(currentValue) === endValue) {
        element.nativeElement.children[0].animate(
          [
            {
              transform: 'scale3d(1, 1, 1)',
            },
            {
              transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
            },
            {
              transform: 'scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg)',
            },
            {
              transform: 'scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg)',
            },
            {
              transform: 'scale3d(1, 1, 1)',
            },
          ],
          {
            duration: 1000,
            delay: 0,
            fill: 'both',
            easing: 'ease-in-out',
          }
        );
      }
      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    };
    step();
  }
}
