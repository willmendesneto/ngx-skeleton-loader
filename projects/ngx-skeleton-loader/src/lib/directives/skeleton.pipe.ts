import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skeletonRepeat'
})
export class SkeletonPipe<T = any> implements PipeTransform {

  transform(value: any, arg: number): any[] {
    if(!(Array.isArray(value) && value?.length > 0)){
      return Array.from(Array(arg).keys());
    }
    return value;
  }

}
