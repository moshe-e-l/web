import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { FormValidationService } from './form-validation.service';
import { QuestionBase, TextboxQuestion } from '../models/question-base';

@Injectable()
export class QuestionControlService {
  constructor(public valid: FormValidationService) { }

  public toFormGroup(questions: QuestionBase<any>[]) {
    console.log(questions)
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = new FormControl(question.value || '', [validation(this.valid, question)]
        // this.setValidation(question)  

      )

    });

    return new FormGroup(group);
  }

  // setValidation(question: QuestionBase<any>){   
  //   let arr:ValidatorFn[]= [];
  //   arr.push(Validators.required);
  //   arr.push(ageRangeValidator);
  //   return arr;
  // }



}



function validation(valid: FormValidationService, question: QuestionBase<any>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    let isNotValid;
    if (question.required){
      isNotValid = valid.validEmptyFiled(control.value, question.controlType);
    if (question.key.toLowerCase().includes("tz") && !isNotValid)
      isNotValid = valid.validTZFun(control.value);
    if (question.key.toLowerCase().includes("phone") && !isNotValid)
        isNotValid = valid.validPhoneFun(control.value);
    if (question.key.toLowerCase().includes("email") && !isNotValid)
        isNotValid = valid.validEmailFun(control.value);   
 
   
    if (question instanceof TextboxQuestion) {
      let tb = question as TextboxQuestion;
      if ((tb.MaxLength != 0 || tb.MinLength != 0) && !isNotValid)
        isNotValid = valid.validNumberRange(tb.MinLength, tb.MaxLength, control.value)
      if(tb.IsNumeric && !isNotValid)
        isNotValid = valid.validOnlyDigits(control.value)
    }
  }

    if (isNotValid) {
      question.validationMsg = question.label.replace("*", "") + " " + isNotValid;
      return { 'generalValidation': true };
    }
    return null;
  };
}

