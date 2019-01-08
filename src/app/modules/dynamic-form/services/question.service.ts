import { Injectable }       from '@angular/core'; 
import { ReplaySubject } from 'rxjs';
import { EvaDataStructure } from '../../../../Models/ParamsModel';
import { GetJsonService } from '../../../services/get-json.service';
import { QuestionBase, DropdownQuestion, TextboxQuestion } from '../models/question-base';

 
@Injectable()
export class QuestionService {
    EwaPost: EvaDataStructure = new EvaDataStructure();
    questionSubject = new ReplaySubject<any>(1);
    constructor(private jsonService: GetJsonService){
    }
    
    getFormFildes(CityID , GroupId){
        let data = this.EwaPost.BuildDataStructure("0e1657a1-7652-4c38-90b7-1cc0237d0afe",
          [{ Name: "@ClientId", Value: CityID },
          { Name: "@GroupId", Value: GroupId }],
          'MastApi_KeepItCity', 'GetStatusNetForms');
        this.jsonService.sendData(data).subscribe(res => {

          return this.buildQuestions(res);  

        }, err => {
        });
        
      }
 

   buildQuestions(data):QuestionBase<any>[] {
    //selects input
    let questions :QuestionBase<any>[] = [];
    let selects = data.filter(f=> f.FieldId != null);
    let selectsGroups = this.groupBy(selects, "FieldId");
     selectsGroups.forEach(element => {       
       let select =  new DropdownQuestion({
            key: 'צריך עיון',
            label: (element[0].CustomFieldLabel ? element[0].CustomFieldLabel : element[0].FieldNameLabel ),           
            options: [
                this.getOptionsForSelectInput(element)            
            ],
            required: element[0].IsRequired,
            order: element[0].Position
          })
          questions.push(select);
     });

    // text box input
   let textboxInputs = data.filter(f=> f.FieldsId != 15 && f.FieldsId != 9);
   textboxInputs.forEach(element => {
    let textbox = new TextboxQuestion({
        key: 'צריך עיון',
        label: (element.CustomFieldLabel ? element.CustomFieldLabel : element.FieldNameLabel ),
        value: null,
        required: element.IsRequired,
        order: element.Position
      });
      questions.push(textbox);
   });
  
 
  // console.log(questions)
   return questions.sort((a, b) => a.order - b.order);
 
    // let questions: QuestionBase<any>[] = [
 
    //   new DropdownQuestion({
    //     key: 'brave',
    //     label: 'Bravery Rating',
    //     options: [
    //       {key: 'solid',  value: 'Solid'},
    //       {key: 'great',  value: 'Great'},
    //       {key: 'good',   value: 'Good'},
    //       {key: 'unproven', value: 'Unproven'}
    //     ],
    //     order: 3
    //   }),
 
    //   new TextboxQuestion({
    //     key: 'firstName',
    //     label: 'First name',
    //     value: 'Bombasto',
    //     required: true,
    //     order: 1
    //   }),
 
    //   new TextboxQuestion({
    //     key: 'emailAddress',
    //     label: 'Email',
    //     type: 'email',
    //     order: 2
    //   })
    // ];
    
   
  }



   groupBy(xs, prop) {
    let arr =[];
    var grouped = {};
    for (var i=0; i<xs.length; i++) {
      var p = xs[i][prop];
      if (!grouped[p]) { grouped[p] = []; }
      grouped[p].push(xs[i]);
    }
    for (let key in grouped) {
        if (grouped.hasOwnProperty(key)) {
          arr.push(grouped[key]);
        }
      }
    return arr;
  }
  getOptionsForSelectInput(input){
   let output = [];
   input.forEach(element => {
       let item = {key: element.DataValue,  value: element.DataValue};
       output.push(item);
   });
   return output;
  }
}