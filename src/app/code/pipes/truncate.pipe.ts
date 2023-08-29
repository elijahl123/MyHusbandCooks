import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {
    const words = value.split(/\s+/);
    const truncatedWords = words.slice(0, limit);

    // Add ellipsis if the text was truncated
    const ellipsis = words.length > limit ? '...' : '';

    return truncatedWords.join(' ') + ellipsis;
  }

}
