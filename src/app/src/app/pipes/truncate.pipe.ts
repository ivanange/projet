import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, size: number = 120): string {
    return value.length > size ? value.substring(0, size) + '...' : value;
  }

}
