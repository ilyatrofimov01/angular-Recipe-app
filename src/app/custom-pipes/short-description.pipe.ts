import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortDescription"
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string, stringLength: number) {
    if (value.length > 25)
    {
      return value.slice(0, stringLength) + "...";
    }
    else{
      return value;
    }
  }

}
