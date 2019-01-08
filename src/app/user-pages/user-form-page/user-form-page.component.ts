import { Component, OnInit, AfterViewInit } from '@angular/core';
 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GetJsonService } from '../../services/get-json.service';
import { FullActionInputParams, ActionInputParams, InputParams, EvaDataStructure } from '../../../Models/ParamsModel';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-form-page',
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.css']
})
export class UserFormPageComponent implements OnInit, AfterViewInit {
   

  iframeSrc: string;
  currentCityID: any;
  pageUid: string;
  formName: string;
  tokenForMastFrameTable: string;

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();;
  params: any = new Array<InputParams>();
  param: InputParams;
  EwaPost: EvaDataStructure = new EvaDataStructure();

  constructor(public commonService: CommonService, private router: Router,
     private route: ActivatedRoute, private jsonService: GetJsonService) {
    this.route.params.subscribe((params: Params) => {
      this.pageUid = params['pageUid'];

      this.currentCityID = params['city'];
     
      if(this.commonService.cityModel.Id!=this.currentCityID)
      this.commonService.getCityDetailFromUmbraco(this.currentCityID,"form" ,"");  
   
      if(this.commonService.formModel.guidId != this.pageUid)
      this.getFormName(this.pageUid);
      else{
      this.formName = this.commonService.formModel.name;
      this.setTitleAndDescription();  
    }
    });
    this.commonService.isLogInUserReceivedSource.first().subscribe(
      (isLogIn) => {
        if (isLogIn)
          this.setTokenInMastFramTable();
        else
          this.iframeSrc = this.jsonService.BASE_FORM_URL + "?prm=" + this.pageUid + "&" + window.location.search;
      }
    );
  }
  ngOnInit() {  }
  ngAfterViewInit() {
    $("#frameDemo").on("load", function () {
      try {
        document.domain = "mast.co.il";
        $("#frameDemo").css("height", $('#frameDemo').contents().find(".content").height() + 300);
      }
      catch (e) {
        $('#frameDemo').height(2000);
      }      
    });          
  }




  setTokenInMastFramTable() {
    this.actionName = 'dbb32747-c526-4865-ab33-41f9bb844267';
    this.dataToSend = new Array<ActionInputParams>();
    this.params = new Array<InputParams>();
    this.param = new InputParams("@PayerId", "27");
    this.params.push(this.param);
    this.param = new InputParams("@CompenyId", this.currentCityID);
    this.params.push(this.param);
    this.param = new InputParams("@Token", this.commonService.guid());
    this.params.push(this.param);
    this.tokenForMastFrameTable = this.param.Value;

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24', 'SetTokenInMastFrameTable')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      this.iframeSrc = this.jsonService.BASE_FORM_URL + "?prm=" + this.pageUid + "&MastToken=" + this.tokenForMastFrameTable;
    }, err => {

      //alert(err);
    });
  }


  getFormName(formId) {
    this.actionName = '52f96f1c-711b-49e7-922d-3173259c6054';
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.param = new InputParams("@FormId", formId);
    this.params.push(this.param);
    this.param = new InputParams("@ClientId", this.currentCityID);// נשלח גם את הפרמטר הזה כדי לוודא שהטופס משויך לרשות. ואם לא נעיף לדף הבית
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_KeepItCity', '');
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

      if (res.length == 0) {
        this.router.navigate(["/"]);
      }
      this.formName = res[0].FormTitle;
    
      this.setTitleAndDescription();  
     
     
    }, err => {
      //alert(err);
    });
  }

  setTitleAndDescription(){
    setTimeout(() => {
      this.commonService.setTitleAndDescription("form", this.commonService.cityModel.name,this.formName);
    }, 3000);
  }

}
