import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

export let appInjector: Injector;


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TransformerOperatorModule {
  constructor(private injector: Injector) {
    appInjector = this.injector;
  }
}
