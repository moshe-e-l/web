import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { InputParams, ActionInputParams, FullActionInputParams, EvaDataStructure } from '../../../Models/ParamsModel';
import { GetJsonService } from '../../services/get-json.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { FormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ValidationService } from '../../services/validation.service';
import { UserSideMenuComponent } from '../../components/user-side-menu/user-side-menu.component';
import { CityDropDownComponent } from '../../components/city-drop-down/city-drop-down.component';

declare function allowOnlyNumbers(): any;



@Component({
  selector: 'app-user-manag-cor-page',
  templateUrl: './user-manag-cor-page.component.html',
  styleUrls: ['./user-manag-cor-page.component.css']

})
export class UserManagCorPageComponent implements OnInit {
   
  @ViewChild(UserSideMenuComponent) SideMenu: UserSideMenuComponent;
  @ViewChild(CityDropDownComponent) cityList : CityDropDownComponent;
  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();
  params: any = new Array<InputParams>();
  param: InputParams;
  EwaPost: EvaDataStructure = new EvaDataStructure();

  isExistsItemsForB2M:boolean = true;
  isCityInB2M:boolean;
  //assetList: any;
  //userDetailsList: any;
  mainUser: any;
  //anotherUser: any;
  //creditDetail: any;
  isCreditDetails:boolean;
  currentCityID: string;
  //isMobileUserApp: boolean;
  //insert asset


  // assetNumberInsertAsset: string = "";
  // selectedCityInsertAsset: string;
  // selectedCityInsertAssetID: string;
  // isErrorMessegAssetMatchHide: boolean = true;
  //validate insert asset
  // isValidAssetNumberMesseg: string;
  // isValidCityNameMesseg: string;
  // isValidAssetNotExsist: boolean = false;
  // isValidRecaptcha: boolean;
  // isRecpaptchaAlredyApprovedOneTime: boolean = false;
  //selectedCity: string;
  //insertAnotherPhone
  //fullNameInsertAnotherPhone: string;
  phoneInsertAnotherPhone: string = "";
  isInsertAnotherPhoneButton: boolean;
  //actionInsertAnotherPhone: string;
  //smsCodeIncorrectMesseg: boolean;
  smsCodeInsertAnotherPhone: string = "";
  //smsSessionGuidInsertAnotherPhone: string;
  //isPhonExsistInSystem: boolean;
  //validate insert another phone
  //isValidPhone: boolean;
  isValidPhoneMesseg: string;

  //leftToolTip:string;
  //topToolTip:string;
  //showToolTip : string= 'hidden';
  //@ViewChild('info') info : ElementRef;
  popUpSubject:string;

  showToolTip1:boolean;
  showToolTip2:boolean;
  constructor(private valid: ValidationService, private router: Router,
     private route: ActivatedRoute, private jsonService: GetJsonService,
      public commonService: CommonService) {

    this.route.params.subscribe((params: Params) => {
      this.currentCityID = params['city'];
    });
    allowOnlyNumbers();
   
    //this.getUserAssets();
    this.checkIfCityInB2M();
    this.setCreditDetail();
 
    this.commonService.userDetailsReceivedSource.first().subscribe(ud=>{
      this.setUserDetails(ud);
     })
   
    
    this.commonService.setTitleAndDescription("otherServices","","ניהול רשות ותאגיד");
  }

  ngAfterViewInit() {

  }
 
  setCreditDetail() {
    this.actionName = '622ce347-650f-4fd5-bae9-dea6d5fc7d00';
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.param = new InputParams("@PayerId", "665");
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24', 'GetCreditDetailByPayerId')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      if(res[0] != null)
        this.isCreditDetails = true;
    }, err => {
      //alert(err);
    });
  }


  insertAsset() {      
    this.SideMenu.prev_insertAsset(this.cityList.selectedCity,
                      this.cityList.getSelectedCityId());
    this.cityList.selectedCity = null;
                     
    }

  // deleteAsset(asset) {
  //   let isSure = confirm(
  //     "האם אתה בטוח?"
  //   );
  //   if (isSure) {
  //     this.dataToSend = new Array<ActionInputParams>()
  //     this.params = new Array<InputParams>();
  //     this.actionName = '9f379e32-f0ea-4d04-ba3c-3ef4b0756aed';
  //     this.params = new Array<InputParams>();
  //     this.param = new InputParams("@PayerId", "1")
  //     this.params.push(this.param);
  //     this.param = new InputParams("@AssetNumber", asset.AssetNumber);
  //     this.params.push(this.param);
  //     this.param = new InputParams("@company_id", asset.company_id);
  //     this.params.push(this.param);

  //     this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
  //     this.dataToSend.push(this.singleDataObj);
  //     this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24', 'DeleteAssetFromB2M_Payer')
  //     this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
  //          if(res[0].result == 1){     
  //          alert("הנכס נמחק בהצלחה");       
  //           this.SideMenu.getFilterdUserCityForSliderMenu();
  //          }
  //          else
  //          {
  //            alert("אירעה שגיאה. עמכם הסליחה.");
  //          }
  //      }, err => {

  //     });
  //   }
  // }

  
  // sendSmsForInsertAnotherPhone(action) {
  //   $("#insertAnotherPhoneDialog").css("display", "none");
  //   $("#loadingDivInsertAnotherPhoneDialog").css("display", "block");
  //   this.actionInsertAnotherPhone = action;// האם להוסיף או למחוק
  //   if (action == 'delete') {
  //     this.insertOrDeleteAnotherPhone();
  //     return false;
  //   }

  //   this.validPhoneFun();
  //   if (this.isValidPhoneMesseg != null) {
  //     $("#insertAnotherPhoneDialog").css("display", "block");
  //     $("#loadingDivInsertAnotherPhoneDialog").css("display", "none");
  //     this.valid.setFocusToLastAlertForAccessibility("insertAnotherPhoneDialog", 2);
  //     return false;
  //   }
  //   this.actionName = "582a6a1a-16db-42fe-bcf2-e25957823ae2";
  //   this.dataToSend = new Array<ActionInputParams>();
  //   this.params = new Array<InputParams>();
  //   this.param = new InputParams('phone', this.commonService.userDetails[0].Phone);
  //   this.params.push(this.param);
  //   this.param = new InputParams('anotherPhone', this.phoneInsertAnotherPhone);
  //   this.params.push(this.param);

  //   this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
  //   this.dataToSend.push(this.singleDataObj);
  //   this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MemberShipProvide', 'MemberShipProvide.MsProvide')
  //   this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
   
  //     if(res == "ERROR")
  //     {
  //       $("#insertAnotherPhoneDialog").css("display", "block");
  //       $("#loadingDivInsertAnotherPhoneDialog").css("display", "none");        
  //       this.isValidPhoneMesseg = "phoneExistsInSystem";     
  //       $("#phoneInsertAnotherPhoneID").addClass("inputErrorToFocus");
  //       this.valid.setFocusToLastAlertForAccessibility("insertAnotherPhoneDialog", 2);
  //     }
  //     if(res == "OK")
  //     {
  //       $("#loadingDivInsertAnotherPhoneDialog").css("display", "none");
  //       $("#smsCodeInsertAnotherPhoneDialog").css("display", "block");
  //     }     
  //   }, err => {    });
  // }

  // insertOrDeleteAnotherPhone() {
  //   $("#smsCodeInsertAnotherPhoneDialog").css("display", "none");
  //   $("#loadingDivInsertAnotherPhoneDialog").css("display", "block");

  //   this.dataToSend = new Array<ActionInputParams>()
  //   this.params = new Array<InputParams>();
  //   this.actionName = 'c93d0463-b064-4b62-a482-9cc648702212';
  //   this.param = new InputParams("@Phone", "127");
  //   this.params.push(this.param);
  //   this.param = new InputParams("@anotherPhone", this.phoneInsertAnotherPhone);
  //   this.params.push(this.param);
  //   this.param = new InputParams("@action", this.actionInsertAnotherPhone);
  //   this.params.push(this.param);
  //   this.param = new InputParams("@code", this.smsCodeInsertAnotherPhone);
  //   this.params.push(this.param);

  //   this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
  //   this.dataToSend.push(this.singleDataObj);
  //   this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24', 'InsertOrDeleteAnotherPhone')
  //   this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

  //     if (res[0].result == 'success') {
  //       if(this.actionInsertAnotherPhone == "insert")
  //       this.isInsertAnotherPhoneButton = false;
  //       if(this.actionInsertAnotherPhone == "delete"){
  //       this.isInsertAnotherPhoneButton = true;
  //        this.phoneInsertAnotherPhone = "";   
  //     }
        
  //       $("#loadingDivInsertAnotherPhoneDialog").css("display", "none");
  //       $("#insertAnotherPhoneDialog").css("display", "block");
  //     }

  //     if (res[0].result == 'error_code') {
  //       $("#smsCodeInsertAnotherPhoneDialog").css("display", "block");
  //       $("#loadingDivInsertAnotherPhoneDialog").css("display", "none");
  //       this.smsCodeIncorrectMesseg = true;
  //       $("#smsCodeInsertAnotherPhoneID").addClass("inputErrorToFocus");
  //       this.valid.setFocusToLastAlertForAccessibility("smsCodeInsertAnotherPhoneDialog", 2);
  //     }
  //     if (res[0].result == 'errorAction') {
  //       alert("אירעה שגיאה לא צפויה. ")
  //     }

  //   }, err => {
  //   });
  //   this.smsCodeInsertAnotherPhone = "";
    
  // }

  insertOrDeleteAnotherPhone(action) {  
    if(action == "insert")
       this.isValidPhoneMesseg = this.valid.validPhoneFun(this.phoneInsertAnotherPhone)
    if(this.isValidPhoneMesseg && action == "insert")
       return false;
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.actionName = 'c93d0463-b064-4b62-a482-9cc648702212';
    this.param = new InputParams("@Phone", "127");
    this.params.push(this.param);
    this.param = new InputParams("@anotherPhone", this.phoneInsertAnotherPhone);
    this.params.push(this.param);
    this.param = new InputParams("@action", action);
    this.params.push(this.param);   
    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24', 'InsertOrDeleteAnotherPhone')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      if (res[0].result == 'exists') {
          this.isValidPhoneMesseg = "phoneExistsInSystem";
      }
      if (res[0].result == 'success') {
        if(action == "insert"){          
          this.isInsertAnotherPhoneButton = false;
          this.commonService.getUserDetail();
        }
        if(action == "delete"){
         this.isInsertAnotherPhoneButton = true;
         this.phoneInsertAnotherPhone = "";   
        }         
      }
      if (res[0].result == 'errorAction') {
        alert("אירעה שגיאה לא צפויה. ")
      }
//
    }, err => {
      //alert(err);
    });
    this.smsCodeInsertAnotherPhone = "";// איפוס שדה הקוד
    
  }

  setUserDetails(res){

    this.mainUser = res[0];
    if (res[1] == null)// סימן שאין טלפון נוסף למשתמש
    {
      this.isInsertAnotherPhoneButton = true;
      this.phoneInsertAnotherPhone = "";
    }
    else {
      this.isInsertAnotherPhoneButton = false;
      this.phoneInsertAnotherPhone = res[1].Phone;
    }
  }

  // goToUpdateDetailUserPage() {
  //   this.router.navigate(["user/" + this.currentCityID + "/update-details"])
  // }
  isExistsItemsB2M(res){   
    this.isExistsItemsForB2M = res.length > 0;
  }
  insertTownScript() {
    $("#addAseetDialog").toggle("slow");
  }
  openInsertAnotherPhoneDialog() {
    $("#wrap_insertAnotherPhone").toggle("slow");
  }

  // changeCreditDitail() {
  //   this.router.navigate(["user/" + this.currentCityID + "/change-credit-details"]);
  // }

  checkIfCityInB2M() {
    let data = this.EwaPost.BuildDataStructure('8dd324be-c207-4afb-ab1b-0476dc094c59',
     [{Name : "@MgarId" , Value : this.currentCityID}],
     'MastApi_Pay24', 'validCityInB2M');
    this.jsonService.sendData(data).subscribe(res => {
      if (res.length == 0){
          this.isCityInB2M = false;
          return false;      
        }
          if (res[0].IsB2M == true)
          this.isCityInB2M = true;
    }, err => {  });
  }
  // add asset validate
  // validAssetNumberFun() {
  //   this.isValidAssetNumberMesseg = this.valid.validAssetNumberFun(this.assetNumberInsertAsset);
  // }
  // validCitiNameFun() {
  //   setTimeout(() => {
  //     this.isValidCityNameMesseg = this.valid.validCitiNameFun(this.fullCorporationList, this.selectedCityInsertAsset);
  //   }, 100);
  // }

  // validSumaryInserAtssetFun() {
  //   this.validCitiNameFun();
  //   if (this.cityList.isValidCityNameMesseg != null)
  //     return false;
  //   else
  //     return true;
  // }

  //insert another phone 
  // validPhoneFun() {
  //   this.isValidPhoneMesseg = this.valid.validPhoneFun(this.phoneInsertAnotherPhone);
  // }

  ngOnInit() {


  }

}
