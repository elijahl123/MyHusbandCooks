import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripTags'
})
export class StripTagsPipe implements PipeTransform {

  transform(value: string): string {
    // Remove HTML tags
    // Return the first 'limit' characters
    return value.replace(/<\/?[^>]+(>|$)/g, '')
  }

}
