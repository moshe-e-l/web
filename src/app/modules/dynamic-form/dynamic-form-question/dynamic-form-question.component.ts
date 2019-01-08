import { Component,AfterViewInit, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup,FormControl, Validators, AbstractControl } from '@angular/forms';
import { QuestionBase } from '../models/question-base';
 
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements AfterViewInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  validationMesseg:string; 

   ngAfterViewInit(){  
   }
  get isValid() {  
  
   if(this.form.controls[this.question.key].touched)
    {       
      //console.log(this.form.controls[this.question.key])
      return this.form.controls[this.question.key].valid;    
    } 

    else
    return true;
  }

 
  
}
