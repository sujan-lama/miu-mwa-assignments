import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorizeDirective } from './colorize.directive';
import { MakeBiggerDirective } from './make-bigger.directive';
import { SwapLetterPipe } from './swap-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ColorizeDirective,
    MakeBiggerDirective,
    SwapLetterPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
