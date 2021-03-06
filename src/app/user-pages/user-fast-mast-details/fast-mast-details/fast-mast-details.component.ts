import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { GetJsonService } from '../../../services/get-json.service';
import { EvaDataStructure, InputParams } from '../../../../Models/ParamsModel';
import { GetUserIpService } from '../../../services/get-user-ip.service';
import { FastMastService } from '../../../services/fast-mast.service';

@Component({
  selector: 'app-fast-mast-details',
  templateUrl: './fast-mast-details.component.html',
  styleUrls: ['./fast-mast-details.component.css']
})
export class FastMastDetailsComponent {
  defaultValues:any;
  EwaPost: EvaDataStructure = new EvaDataStructure();
  userIP:string;
  constructor(public commonService : CommonService,  private ipService: GetUserIpService,
              private jsonService: GetJsonService, public fastMastService: FastMastService) {         
    this.defaultValues = {};
    this.defaultValues["phone"] = this.fastMastService.FMuserDetails.Phone;
    this.defaultValues["user_name"] = this.fastMastService.FMuserDetails.PayerId;
    this.defaultValues["last_name"] = this.fastMastService.FMuserDetails.last_name;
    this.defaultValues["first_name"] = this.fastMastService.FMuserDetails.first_name;
    this.defaultValues["IsApprovedRegulation"] = true; 

    this.ipService.getIpCliente().subscribe(res => {
      this.userIP = res;
    }, err => {  });
  }
  getUserFormData(params : InputParams []){   
    params.push(new InputParams('@RegIp', this.userIP))
    params.push(new InputParams('@company_id', this.fastMastService.clientId))
    params.push(new InputParams('@password', "fast-mast"))
    params.push(new InputParams("@userAgent" , this.commonService.userAgent))
    params.push(new InputParams("@Identity_Type" , "1"));
    console.log(params);
    this.insertUserToDB(params);
  }
  

  insertUserToDB(params) {
    this.commonService.showLoader = true;  

    let data = this.EwaPost.BuildDataStructure("59216607-79DB-44F3-B1D7-3E9E5B1D3E14",
               params,'MastApi_Pay24', 'createUser');
       
    this.jsonService.sendData(data).subscribe(res => {      
      this.commonService.showLoader = false; 
    }, err => { });
    this.fastMastService.activeStep = "arnona";
  }


}
