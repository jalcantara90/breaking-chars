import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  languageSelector = new FormControl('es');
  private languageSubscription = new Subscription();

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.languageSubscription = this.languageSelector.valueChanges
      .subscribe(this.translateService.use.bind(this));
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }
}
