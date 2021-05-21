import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { conatinerTrigger, bouncingLeft, bouncingRight } from '@shared/animations';

@Component({
  selector: 'bc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    conatinerTrigger,
    bouncingLeft,
    bouncingRight
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public languageSelector = new FormControl('es');
  private languageSubscription = new Subscription();
  private scale = 1;

  get transform(): string {
    return `scale(${this.scale})`;
  }

  get height(): number {
    return this.scale * 200 ;
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.languageSubscription = this.languageSelector.valueChanges
      .subscribe(language => this.translateService.use(language));
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  onElastic(scale: number) {
    this.scale = Math.max(scale, 0.5);
  }
}
