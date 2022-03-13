import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-sujan',
  template: `
    <p #para>{{ city.name }} - {{ street }}</p>
    <!-- <h1>{{ para.innerHTML }}</h1> -->
    <button (click)="sendToParent()">send to parent</button>
    <ng-content></ng-content>
  `,
  styles: [
    `
      p {
        color: red;
      }
    `,
  ],
  // encapsulation: ViewEncapsulation.ShadowDom,
  // inputs: ['city'],
})
export class SujanComponent implements OnInit, OnChanges {
  @ViewChild('para') dataOfParagraph: any;
  @ContentChild('parentPara') dataOfParent: any;

  @Input()
  public city!: { name: string };
  @Input('potato')
  street!: string;

  @Output()
  streetChange: EventEmitter<{ msg: string }> = new EventEmitter();

  sendToParent() {
    this.dataOfParagraph.nativeElement.innerHTML = 'HAHAH';
    this.dataOfParent.nativeElement.innerHTML = 'Hohoho';
    this.streetChange.emit({ msg: 'street has changed!!!' });
  }

  constructor() {
    console.log('sujan constructor is called');
    console.log('const: ', this.city);

    // setTimeout(() => {
    //   this.streetChange.emit({ msg: 'street has changed!!!' });
    // }, 5000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('init is called');
    console.log('init: ', this.city);
  }
}
