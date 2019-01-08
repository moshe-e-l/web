import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GetJsonService } from '../../services/get-json.service';
import { FullActionInputParams, ActionInputParams, InputParams } from '../../../Models/ParamsModel';
import {Location} from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
import { ValidationService } from '../../services/validation.service';
import { ReCaptchaDirective } from '../../modules/dynamic-form/directives/recaptha.directive';


declare function allowOnlyNumbers(): any;
//declare function recaptchaScript(): any;
declare var NativeApp: any;
declare var grecaptcha:any;  

@Component({
  selector: 'app-change-phone-number',
  templateUrl: './change-phone-number.component.html',
  styleUrls: ['./change-phone-number.component.css']
})
export class ChangePhoneNumberComponent implements OnInit,AfterViewInit {
   

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();;
  params: any = new Array<InputParams>();
  param: InputParams;

  phone: string = "";
  payerid: string = "";
  newPhone: string = "";
  assetNumber: string = "";

  //valdation
  isValidSum:boolean;
  isValidNewPhoneMesseg: string = "";
  isValidPhoneMesseg: string = "";
  isValidAssetNumberMesseg: string = "";
  isValidTZMesseg: string = "";
  isValidRecaptcha:boolean;

  @ViewChild(ReCaptchaDirective) captcha : ReCaptchaDirective;

  constructor(private valid :ValidationService,public commonService:CommonService, private _location: Location , private router: Router, private route: ActivatedRoute, private jsonService: GetJsonService, private meta: Meta) {
      this.commonService.setTitleAndDescription("otherServices","","החלפת מספר טלפון ");   
   }
  
  ngAfterViewInit()
  {
   // this.commonService.recaptchaScript();
    allowOnlyNumbers(); 
  }
  
  changePhoneNumber(event) {
    event.preventDefault()   
    if(!this.validation())
   {
    this.valid.setFocusToLastAlertForAccessibility("form_section_1",2);      
    return false;
   }
    this.actionName = 'b9c90259-0f28-4b1f-8ba6-390d2c5742f2';
    this.params = new Array<InputParams>();
    this.dataToSend = new Array<ActionInputParams>()
    this.param = new InputParams("@phone",this.phone);
    this.params.push(this.param);
    this.param = new InputParams("@payerid",this.payerid);
    this.params.push(this.param);
    this.param = new InputParams("@newPhone",this.newPhone);
    this.params.push(this.param);
    this.param = new InputParams("@assetNumber",this.assetNumber);
    this.params.push(this.param);
  
   // let recapchaCode= $(".g-recaptcha-response").val();
    //this.param = new InputParams("@recaptchaCode", recapchaCode.toString()); 
    this.param = new InputParams("@recaptchaCode",this.captcha.token);  
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24','ChangePhoneNotLogedOn')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      this.isValidSum = false;
      this.isValidRecaptcha= false;
      if(res.Name=="errorRecaptcha")
      {
        this.isValidRecaptcha= true;
        return false;
      }
     
      if (res[0].Column1 == 1)
        {
          $(".alertSign").show();
          setTimeout(() => {
            $(".alertSign").hide();
            this.router.navigate(['']);          
          }, 3000); 
        }
      
      if (res[0].Column1 == 0)
     {
     // grecaptcha.reset(); // נאפס את הקפצ'ה כי אם היא תישלח עם אותו אישור פעמיים תחזור תשובה שלילית
        this.captcha.resetCaptcha();
        this.isValidSum = true;
     } 
    }, err => {
      //alert(err);
    });


  }

  goToBackPage()
  {
    this._location.back();     
  }

  

  validTZFun() { 
    this.isValidTZMesseg =  this.valid.validTZFun(this.payerid);
  }

  validAssetNumberFun() {
   this.isValidAssetNumberMesseg = this.valid.validAssetNumberFun(this.assetNumber);   
  }
  validPhoneFun() {
    this.isValidPhoneMesseg = this.valid.validPhoneFun(this.phone);   
  }

  validNewPhoneFun() {
    this.isValidNewPhoneMesseg = this.valid.validPhoneFun(this.newPhone);    
  }
  validation()
  {
    this.validTZFun();
    this.validAssetNumberFun();
    this.validPhoneFun();
    this.validNewPhoneFun();
    if(this.isValidTZMesseg!=null || this.isValidAssetNumberMesseg!= null
       || this.isValidPhoneMesseg !=null || this.isValidNewPhoneMesseg!= null)
       return false;
       else
       return true;
  }
  ngOnInit() {  
  
    }

}
