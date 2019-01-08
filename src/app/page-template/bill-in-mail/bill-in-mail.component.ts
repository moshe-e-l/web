import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GetJsonService } from '../../services/get-json.service';
import { FullActionInputParams, ActionInputParams, InputParams } from '../../../Models/ParamsModel';
import { User } from '../../../Models/UserModel';
import { GetUserIpService } from '../../services/get-user-ip.service';
import { CommonService } from '../../services/common.service';
import { ValidationService } from '../../services/validation.service';
import { ReCaptchaDirective } from '../../modules/dynamic-form/directives/recaptha.directive';

declare function resetCaptcha();

@Component({
  selector: 'app-bill-in-mail',
  templateUrl: './bill-in-mail.component.html',
  styleUrls: ['./bill-in-mail.component.css']
})
export class BillInMailComponent implements OnInit, AfterViewInit {
  currentCityID: any;
  user: User = new User();
  assetNumber: string = "";
  userIP: string;


   

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();
  params: any = new Array<InputParams>();
  param: InputParams;

  isValidRecaptcha: boolean;
  isValidRegulations: boolean;
  isValidRegulationsMesseg: boolean = false;
  isValidFirstNameMesseg: string;
  isValidLastNameMesseg: string;
  isValidEmailMesseg: string;
  isValidPhoneMesseg: string;
  isValidTZMesseg: string;
  isValidUserNameMesseg: string;
  isResultMesseg: boolean;
  resultMesseg: string;

  isValidAssetNumberMesseg: string;
  @ViewChild(ReCaptchaDirective) captcha : ReCaptchaDirective;

  constructor(private valid: ValidationService, public commonService: CommonService,
     private ipService: GetUserIpService, private router: Router, 
     private route: ActivatedRoute, private jsonService: GetJsonService) {
    this.route.params.subscribe((params: Params) => {
      this.currentCityID = params['city'];
    });
    this.validCityInB2M();
  }

  ngOnInit() {
    this.ipService.getIpCliente().subscribe(res => {
      this.userIP = res;
    }, err => {
      //alert(err);
    });
  }
  ngAfterViewInit() {
  //  this.commonService.secoendRecaptchaScript();
  }

   
  validCityInB2M()
  {
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.actionName = '8dd324be-c207-4afb-ab1b-0476dc094c59';    
    this.param = new InputParams("@MgarId",this.currentCityID);
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24','validCityInB2M');
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {      
     if(res.length == 0)
        this.router.navigate(['']);
     if(res[0].IsB2M != true)
        this.router.navigate(['']);
    }, err => {
      //alert(err);
    });
  }

  insertUserToDB() {
    this.commonService.showLoader = true;

    if (!this.validation()) {
      this.commonService.showLoader = false;
      this.valid.setFocusToLastAlertForAccessibility("form1", 2);
      return false;
    }

    this.actionName = '59216607-79DB-44F3-B1D7-3E9E5B1D3E14';

    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();

    this.param = new InputParams('@RegIp', this.userIP);
    this.params.push(this.param);
    this.param = new InputParams('@user_name', this.user.UserName);
    this.params.push(this.param);
    this.param = new InputParams('@password', '');
    this.params.push(this.param);
    this.param = new InputParams('@tz', this.user.TZ);
    this.params.push(this.param);
    this.param = new InputParams('@first_name', this.user.FirstName);
    this.params.push(this.param);
    this.param = new InputParams('@last_name', this.user.LastName);
    this.params.push(this.param);
    this.param = new InputParams('@company_id', this.currentCityID);
    this.params.push(this.param);
    this.param = new InputParams('@email', this.user.Email);
    this.params.push(this.param);
    this.param = new InputParams('@phone', this.user.Phone);
    this.params.push(this.param);
    this.param = new InputParams('@bill2mail', "true");
    this.params.push(this.param);
    this.param = new InputParams('@IsApprovedRegulation', "true");
    this.params.push(this.param);
    this.param = new InputParams("@userAgent" , this.commonService.userAgent);  
    this.params.push(this.param);
    this.param = new InputParams("@Identity_Type" , "1");  
    this.params.push(this.param);

    //let recaptchaCode = $(".g-recaptcha-response").last().val();
    //this.param = new InputParams("@recaptchaCode", recaptchaCode.toString());
    this.param = new InputParams("@recaptchaCode",this.captcha.token); 
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24', '')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

      

      this.isValidRecaptcha = false;
      if (res.Name == "errorRecaptcha") {
        this.commonService.showLoader = false;
        this.isValidRecaptcha = true;
        return false;
      }
      this.insertUserToB2M();

    }, err => {
      //alert(err);
    });

  }

  insertUserToB2M() {
    this.actionName = 'a833a981-566b-46ad-9b83-d4932f3f6ad7';
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.param = new InputParams('@company_id', this.currentCityID);
    this.params.push(this.param);

    this.param = new InputParams('@email', this.user.Email);
    this.params.push(this.param);

    this.param = new InputParams('@user_name', this.user.UserName);
    this.params.push(this.param);

    this.param = new InputParams('@last_name', this.user.LastName);
    this.params.push(this.param);

    this.param = new InputParams('@first_name', this.user.FirstName);
    this.params.push(this.param);

    this.param = new InputParams('@phone', this.user.Phone);
    this.params.push(this.param);

    this.param = new InputParams('@assetNumber', this.assetNumber);
    this.params.push(this.param);


    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'PayLogic', 'PayLogic.PayLogicClass')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      this.commonService.showLoader = false;
     // resetCaptcha();
     this.captcha.resetCaptcha();

      if (res.Name == "errorWS") {
        alert("WS is down");
        return false;
      }
      if (res.Value == "success") {
        $(".alertSign").show();
        setTimeout(() => {
          $(".alertSign").hide();
          this.router.navigate([this.currentCityID + '/services']);
        }, 3000);
      }
      if (res.Value == "existsUser") {
        this.isResultMesseg = true;
        this.resultMesseg = "מספר זה כבר קיים במערכת"
      }
      if (res.Value == "reg-fail") {
        this.isResultMesseg = true;
        this.resultMesseg = "ההרשמה נכשלה. עמכם הסליחה."
      }

    }, err => {
      //alert(err);
    });
  }

  validation() {
    this.validRegulationsFun();
    this.validFirstNameFun();
    this.validLastNameFun();
    this.validEmailFun();
    this.validPhoneFun();
    this.validTZFun();
    this.validAssetNumberFun();
    this.validUserNameFun();

    if (this.isValidFirstNameMesseg != null || this.isValidLastNameMesseg != null ||
      this.isValidEmailMesseg != null || this.isValidPhoneMesseg != null || this.isValidUserNameMesseg ||
      this.isValidTZMesseg != null || this.isValidAssetNumberMesseg != null || this.isValidRegulationsMesseg)
      return false;
    else
      return true;

  }

  validFirstNameFun() {
    this.isValidFirstNameMesseg = this.valid.validNameFun(this.user.FirstName, "FirstName");
  }
  validLastNameFun() {
    this.isValidLastNameMesseg = this.valid.validNameFun(this.user.LastName, "LastName");
  }
  validEmailFun() {
    this.isValidEmailMesseg = this.valid.validEmailFun(this.user.Email);
  }
  validPhoneFun() {
    this.isValidPhoneMesseg = this.valid.validPhoneFun(this.user.Phone);
  }
  validTZFun() {
    this.isValidTZMesseg = this.valid.validTZFun(this.user.TZ);
  }
  validRegulationsFun() {
    this.isValidRegulationsMesseg = this.valid.validRegulationsFun(this.isValidRegulations);
  }
  validAssetNumberFun() {
    this.isValidAssetNumberMesseg = this.valid.validAssetNumberFun(this.assetNumber);
  }
  validUserNameFun() {
    this.isValidUserNameMesseg = this.valid.validEmptyFiled(this.user.UserName, "payerNumber");
  }

}
