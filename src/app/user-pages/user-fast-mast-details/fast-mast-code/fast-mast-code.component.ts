import { Component, OnInit } from '@angular/core';
import { FastMastService } from '../../../services/fast-mast.service';
import { EvaDataStructure } from '../../../../Models/ParamsModel';
import { GetJsonService } from '../../../services/get-json.service';

@Component({
  selector: 'app-fast-mast-code',
  templateUrl: './fast-mast-code.component.html',
  styleUrls: ['./fast-mast-code.component.css'] 
})
export class FastMastCodeComponent implements OnInit {
  EwaPost: EvaDataStructure = new EvaDataStructure();
  popUpSubject : string;
  constructor(public fastMastService: FastMastService, private jsonService: GetJsonService) { }
  
  ngOnInit() {
  }

  GetUserDetailByFastMastCode() {
    let data = this.EwaPost.BuildDataStructure("7ff39d2e-d866-4440-8b43-e7095356d092",
                [{Name : "@Code" , Value : this.fastMastService.code },
                {Name : "@ClientId" , Value : this.fastMastService.clientId}], 
               'MastApi_KeepItCity', 'fastMastValidtion');
    this.jsonService.sendData(data).subscribe(res => {     
      if (!res[0])   
         this.popUpSubject = "IncorrectCode";
        else{
          this.fastMastService.FMuserDetails = res[0];
          this.fastMastService.activeStep = "details";
        }
    }, err => {  });
  }
}
