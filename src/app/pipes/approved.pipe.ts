import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'approved', standalone: true })
export class ApprovedPipe implements PipeTransform {
  transform(value: boolean) {
    return value ? 'Approved' : 'Not approved';
  }
}
