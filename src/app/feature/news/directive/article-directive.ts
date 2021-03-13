import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[articleCard]' })
export class ArticleDirective implements OnInit, OnDestroy {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.elRef.nativeElement.addEventListener('mouseenter', () =>
      this.onMouseEnter()
    );
    this.elRef.nativeElement.addEventListener('mouseleave', () =>
      this.onMouseLeave()
    );
  }

  ngOnDestroy() {
    this.elRef.nativeElement.removeEventListener(
      'mouseenter',
      this.onMouseEnter
    );
    this.elRef.nativeElement.removeEventListener(
      'mouseleave',
      this.onMouseLeave
    );
  }

  onMouseEnter() {
    console.log('enter!', this.elRef.nativeElement.children[1]);
    this.renderer.addClass(this.elRef.nativeElement.children[1], 'hover');
  }

  onMouseLeave() {
    console.log('leave!');
    this.renderer.removeClass(this.elRef.nativeElement.children[1], 'hover');
  }
}
