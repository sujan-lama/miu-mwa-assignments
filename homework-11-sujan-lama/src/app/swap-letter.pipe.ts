import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'swapLetter',
})
export class SwapLetterPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return (value as string)
      .replace(new RegExp(args[0] as string, 'gi'), args[1] as string);
  }
}
