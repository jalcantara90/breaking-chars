import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, Inject, Output } from "@angular/core";
import { fromEvent } from "rxjs";
import { map, mapTo } from "rxjs/operators";

@Directive({
  selector: "[bcSticky]"
})
export class StickyDirective {
  initial = this.elementRef.nativeElement.getBoundingClientRect().top;

  @Output() bcSticky = fromEvent(
    this.documentRef,
    "scroll"
  ).pipe(
    mapTo(this.initial),
    map(this.getScale.bind(this))
  );

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  get top(): number {
    return this.documentRef.documentElement.scrollTop;
  }

  get height() {
    return this.documentRef.documentElement.offsetHeight;
  }

  private getScale(top: number): number {
    return clamp((this.height - this.top + top) / this.height, 0.15, 1);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
