import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[appArticleCard]' })
export class NewsDirective implements OnInit, OnDestroy {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.elRef.nativeElement.addEventListener('mouseenter', () =>
      this.onMouseEnter()
    );
    this.elRef.nativeElement.addEventListener('mouseleave', () =>
      this.onMouseLeave()
    );
  }

  ngOnDestroy(): void {
    this.elRef.nativeElement.removeEventListener(
      'mouseenter',
      this.onMouseEnter
    );
    this.elRef.nativeElement.removeEventListener(
      'mouseleave',
      this.onMouseLeave
    );
  }

  onMouseEnter(): void {
    this.renderer.addClass(this.elRef.nativeElement.children[1], 'hover');
  }

  onMouseLeave(): void {
    this.renderer.removeClass(this.elRef.nativeElement.children[1], 'hover');
  }
}
