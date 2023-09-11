import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtmlEntries'
})
export class RemoveHtmlEntriesPipe implements PipeTransform {

  transform(value: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    return doc.documentElement.textContent || "";
  }

}
