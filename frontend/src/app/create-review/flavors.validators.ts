import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FlavorsValidators {

  static flavorlistEmpty(object): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (object.flavorsList.length === 0) {
        return {listEmpty: (object.flavorsList.length === 0)};
      }
      return null;
    };
  }
}
