import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../../Models/UserModel';
import { InputParams, ActionInputParams, FullActionInputParams, EvaDataStructure } from '../../../Models/ParamsModel';
import { GetJsonService } from '../../services/get-json.service'
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ValidationService } from '../../services/validation.service';
import { CityDropDownComponent } from '../city-drop-down/city-drop-down.component';
import { GetUserIpService } from '../../services/get-user-ip.service';
import { ReCaptchaDirective } from '../../modules/dynamic-form/directives/recaptha.directive';

declare function allowOnlyNumbers(): any;
declare var grecaptcha: any;

@Component({
  selector: 'app-regestrition-log-in',
  templateUrl: './regestrition-log-in.component.html',
  styleUrls: ['./regestrition-log-in.component.css']
})

export class RegestritionLogInComponent implements AfterViewInit {

  @ViewChild('mobilenumber') mobilenumber: ElementRef;
  @ViewChild("CityDropDown") cityList: CityDropDownComponent;
  @ViewChild("CityDropDown2") cityList2: CityDropDownComponent;

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();
  params: any = new Array<InputParams>();
  param: InputParams;
  EwaPost: EvaDataStructure = new EvaDataStructure();

  // create user
  user: User = new User();
  TzOrPassport: string;
  // validate create user
  isValidExsistsPhone: boolean = false;
  isValidRegulations: boolean;
  isValidRegulationsMesseg: boolean = false;
  isValidFirstNameMesseg: string;
  isValidLastNameMesseg: string;
  isValidEmailMesseg: string;
  isValidPhoneMesseg: string;
  isValidTZMesseg: string;
  isValidRecaptcha: boolean;
  // log in
  isvalidPhoneLoginUserMesseg: string;
  isExpiredSms: boolean;
  expiredMesseg: string;
  isValidRegulationsForRegUser: boolean;
  isValidRegulationsForRegUserMesseg: boolean;
  smsCode: string = "";
  smsSessionGuid: string;
  userSessionGuid: string;
  payerID: string;
  phone: string;
  phoneNumberToLogIn: string = "";
  smsCodeIncorrectMesseg: boolean;
  userDetails: any;
  isVocalMesseg: boolean;
  userIP: string;
  loadCaptcha:boolean = false;
  userCompenyId:string;

  @ViewChild(ReCaptchaDirective) captcha : ReCaptchaDirective;

  constructor(private valid: ValidationService, public commonService: CommonService,
     private router: Router, private jsonService: GetJsonService,
     private ipService: GetUserIpService) {  }
  ngAfterViewInit() {   
    allowOnlyNumbers();
  // console.log(this.translation.translate("accessbility"));
  setTimeout(() => {
    this.loadCaptcha = true;
  }, 2000);
  }
  registrationScript(event) {
    event.stopPropagation();
 //   this.commonService.recaptchaScript();
    $("#regDiv").addClass("active");
    $("#regDiv").slideToggle();
    $(".dropdown_login_data").css("display", "none");
  }
  loginScript(event) {
    event.stopPropagation();  
    $(".dropdown_login_data").addClass("active");
    $(".dropdown_login_data").slideToggle();
    $("#regDiv").css("display", "none");
   // this.mobilenumber.nativeElement.focus();
  }


  registration() {

    if (!this.validSumaryRegFun()) {
      this.valid.setFocusToLastAlertForAccessibility("form_section_1", 2);
      return false;
    }
    this.actionName = '69d2096b-2e55-4f56-a743-a63778c914c3';
    let selectedCityId = this.cityList.getSelectedCityId()
    this.user.CompanyId = selectedCityId;
    this.user.identity_type = (this.TzOrPassport == 'tz' ? "1" : "3");
    this.user.UserName =  this.user.TZ;

    let arr = [];
    for (let key in this.user) {
      if (this.user.hasOwnProperty(key)) {
        arr.push(this.user[key]);
      }
    }
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();

    for (let i = 0; arr.length - 1 > i; i += 2) {
      this.param = new InputParams(arr[i + 1], arr[i]);
      this.params.push(this.param);
    }

    this.param = new InputParams("@userAgent", this.commonService.userAgent);
    this.params.push(this.param);
    this.param = new InputParams("token", this.commonService.guid());
    this.userSessionGuid = this.param.Value;
    this.params.push(this.param);
   // let recaptchaCode = $(".g-recaptcha-response").val();

    this.param = new InputParams("@recaptchaCode",this.captcha.token);  // recaptchaCode.toString());
    this.params.push(this.param);
    this.param = new InputParams("cityName", this.cityList.selectedCity);
    this.params.push(this.param);
    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MemberShipProvide', 'MemberShipProvide.MsProvide/');
    this.commonService.showLoader = true;
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      this.commonService.showLoader = false;
      this.isValidRecaptcha = false;
      if (res.Name == "errorRecaptcha") {
        this.isValidRecaptcha = true;
        return false;
      }
      this.isValidExsistsPhone = false;
      if (res.Name == "errorExistsUser") {
       // grecaptcha.reset(); // נאפס את הקפצ'ה כי ם היא תישלח עם אותו אישור פעמיים תחזור תשובה שלילית
       //this.captcha.isSecondUse = true;
       this.captcha.resetCaptcha();

        this.isValidExsistsPhone = true;
        $("#cellphone_number").addClass("inputErrorToFocus");
        this.valid.setFocusToLastAlertForAccessibility("form_section_1", 2);
        return false;
      }
 
      this.jsonService.createCookie("token", this.userSessionGuid, 1);
 
      this.router.navigate(['/user/' + selectedCityId + '/services']);

    }, err => {
      //alert(err);
    });
  }

  returnToAddPhoneDialog() {
    $("#logInForm").css("display", "block");
    $("#smsCodeForm").css("display", "none"); //טופס הזנת קוד סמס
  }

  logIn(isVocalMesseg) {
    this.isVocalMesseg = isVocalMesseg;
    this.validPhoneLoginUserFun()
    if (this.isvalidPhoneLoginUserMesseg != null) {
      this.valid.setFocusToLastAlertForAccessibility("login_form_box_1", 2);
      return false;
    }
    
    this.commonService.showLoader = true;
   
   let data = this.EwaPost.BuildDataStructure("5c8906b5-31c0-4ee5-8d1f-5b85ec68f827",
                                   [{Name : "phone", Value :this.phoneNumberToLogIn},
                                    {Name : "isVocalMesseg", Value :isVocalMesseg}],
                                   'MemberShipProvide','MemberShipProvide.MsProvide/');
    this.jsonService.sendData(data).subscribe(res => {

      this.commonService.showLoader = false;
      if(res == "NOT_EXISTS")
      {
        this.router.navigate(["registraion-log-in-page"]);
        return false;
      }
      if (res.Name == "ExceedingConnection") {
        $("#smsCodeForm").css("display", "none");
        $("#logInForm").css("display", "block");
        this.isExpiredSms = true;
        let time = res.Value.split("|");
        this.expiredMesseg = "לא ניתן להתחבר כעת, אנא נסה בעוד " + time[0] + " שעות ו " + time[1] + " דקות ";
        setTimeout(() => {
          $("#mobilenumber").addClass("inputErrorToFocus");
          this.valid.setFocusToLastAlertForAccessibility("login_form_box_1",2);
        }, 200);       
      }
      else{
        $("#logInForm").css("display", "none");
        $("#smsCodeForm").css("display", "block");
        $("#smsCodeInput").focus();
      }
    }, err => {   });
  }

  validateSmsCode() {   
    this.userSessionGuid =this.commonService.guid();
   let data = this.EwaPost.BuildDataStructure("51faf412-bd15-42a2-b706-7d16964f7548",
                                    [{Name : "code", Value :this.smsCode},
                                     {Name : "phone", Value :this.phoneNumberToLogIn},
                                     {Name : "token", Value :this.userSessionGuid}],
                                    'MemberShipProvide','MemberShipProvide.MsProvide/');
   this.commonService.showLoader = true;

    this.jsonService.sendData(data).subscribe(res => {
  
      this.commonService.showLoader = false;
      if (res.Value == "ERROR_CODE") {
        $("#smsCodeInput").addClass("inputErrorToFocus");
        this.valid.setFocusToLastAlertForAccessibility("login_form_box_smsCode", 2);
        this.smsCodeIncorrectMesseg = true;
        return false;
      }
      else{
          this.userCompenyId = res[0].company_id;
        if (res[0].IsApprovedRegulation != 1) {
          this.ipService.getIpCliente().subscribe(res => {
            this.userIP = res;
          }, err => {     });
          $("#smsCodeForm").css("display", "none");
          $("#approvedRegulationForm").css("display", "block");
          return false;
        }      
      
        if(res[0].company_id != 0){
         this.jsonService.createCookie("token", this.userSessionGuid, 1);  
        this.router.navigate(['/user/' + res[0].company_id + '/services']);
        }
        else
        {
          $("#smsCodeForm").css("display", "none");
          $("#addCityForm").css("display", "block");        
        }
      }
    }, err => {
      //alert(err);
    });

  }  
  
  updateCity()
  {
    let data = this.EwaPost.BuildDataStructure("3BCA5D86-B579-4831-B48A-F4BFBDEE0415",
    [{Name : "@phone", Value :this.phoneNumberToLogIn},
     {Name : "@CompanyId", Value :this.cityList2.getSelectedCityId()}],
    'MastApi_Pay24','updateCity');

     this.jsonService.sendData(data).subscribe(res => {
     if(res[0].result == 1){
     this.jsonService.createCookie("token", this.userSessionGuid, 1);
     this.router.navigate(['/user/' + this.cityList2.getSelectedCityId() + '/services']);
     }
    }, err => { });
  }

  approvedRegulationFun() {
    this.validRegulationsForRegUserFun()
    if (this.isValidRegulationsForRegUserMesseg) {
      this.valid.setFocusToLastAlertForAccessibility("login_form_box_regulations", 2);
      return false;
    }
    let data = this.EwaPost.BuildDataStructure("115f040b-df82-466d-85af-b930dbd7d737",
    [{Name : "@phone", Value :this.phoneNumberToLogIn},
     {Name : "@RegIp", Value :this.userIP}],
    'MastApi_Pay24','updateRegulation');
      this.jsonService.sendData(data).subscribe(res => {
      if (res[0].result == 1) {
        if(this.userCompenyId != "0")
        {
        this.jsonService.createCookie("token", this.userSessionGuid, 1);
        this.router.navigate(['/user/' + this.userCompenyId + '/services']);
        }
        else
        {
          $("#addCityForm").css("display", "block");  
          $("#approvedRegulationForm").css("display", "none");      
        }
      }
    }, err => {
      //alert(err);
    });


  }

  setTzOrPassport(e) {
    this.TzOrPassport = e.target.value;
    setTimeout(() => {
      let tz = $("#TZ");
      tz.prop("placeholder", (this.TzOrPassport == 'tz' ? '* תעודת זהות' : '* דרכון'))
      tz.focus();
    }, 1);
  }
  setTzOrPassportToNull() {
    this.TzOrPassport = null;
    this.isValidTZMesseg = null;
  }
  hideIncorrectCodeMesseg() {
    this.smsCodeIncorrectMesseg = false;
  }

  openPageFromFooter(pageName) {
    this.router.navigate(["content/" + pageName]);
  }

  // validaition log in
  validPhoneLoginUserFun() {
    this.isvalidPhoneLoginUserMesseg = this.valid.validPhoneFun(this.phoneNumberToLogIn);
  }
  // validaition registration
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
    if (this.TzOrPassport == 'tz')
      this.isValidTZMesseg = this.valid.validTZFun(this.user.TZ);
    else
      this.isValidTZMesseg = this.valid.validEmptyFiled(this.user.TZ, "passport");
  }
  validRegulationsFun() {
    this.isValidRegulationsMesseg = this.valid.validRegulationsFun(this.isValidRegulations);
  }
  validSumaryRegFun() {
    this.validRegulationsFun();
    this.validFirstNameFun();
    this.validLastNameFun();
    this.validEmailFun();
    this.validPhoneFun();
    this.validTZFun();
    this.cityList.validCitiNameFun();

    if (this.isValidFirstNameMesseg != null || this.isValidLastNameMesseg != null ||
      this.isValidEmailMesseg != null || this.isValidPhoneMesseg != null ||
      this.isValidTZMesseg != null || this.isValidRegulationsMesseg ||
      this.cityList.isValidCityNameMesseg != null)
      return false;
    else
      return true;
  }
  // validaition Regulations 
  validRegulationsForRegUserFun() { // לטובת משתמשים שהוספו ע"י נציג ורק צריכים לאשר תקנון
    this.isValidRegulationsForRegUserMesseg = this.valid.validRegulationsFun(this.isValidRegulationsForRegUser);
  }

}
