import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp6',
  template: `
    <h1>Component 6:</h1>
    <p>Component LifeCycle: Check Console...</p>
  `,
  styles: []
})
export class Comp6Component implements OnInit {
    constructor() { }

    ngOnChanges() {
        this.log('ngOnChanges');
    }

    ngOnInit() {
        this.log('ngOnInit');
    }

    ngDoCheck() {
        this.log('ngDoCheck');
    }

    ngAfterContentInit() {
        this.log('ngAfterContentInit');
    }

    ngAfterContentChecked() {
        this.log('ngAfterContentChecked');
    }

    ngAfterViewInit() {
        this.log('ngAfterViewInit');
    }

    ngAfterViewChecked() {
        this.log('ngAfterViewChecked');
    }

    ngOnDestroy() {
        this.log('ngOnDestroy');
    }

   private log(msg: string) {
        console.log(msg);
    }


}
