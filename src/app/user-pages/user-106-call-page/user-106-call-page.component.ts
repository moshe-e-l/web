import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GetJsonService } from '../../services/get-json.service';
import { FullActionInputParams, ActionInputParams, InputParams, EvaDataStructure } from '../../../Models/ParamsModel';
import { CommonService } from '../../services/common.service';
import { GetLoctaionService } from '../../services/get-location.service';
import { call106FileModel } from '../../../Models/call106FileModel';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { ValidationService, fileType } from '../../services/validation.service';

declare var NativeApp: any;

@Component({
  selector: 'app-user-106-call-page',
  templateUrl: './user-106-call-page.component.html',
  styleUrls: ['./user-106-call-page.component.css']
})
export class User106CallPageComponent implements OnInit {

   
  @ViewChild('someInput') someInput: ElementRef;
  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();;
  params: any = new Array<InputParams>();
  param: InputParams;
  EwaPost: EvaDataStructure = new EvaDataStructure();


  Description: string = "";
 // Latitude: string = "";
  //Longitude: string = "";
  ClientId: string = "";
  AppId: string = "";
  //MokedStatus: string = "";
  //MokedMessage: string = "";
  //UserId: string = "";
  StreetName: string = "";
  CityName: string = "";
  StreetNumber: string = "";
  //NewSystem: string = "";
  //UserFirstName: string = "";
  //UserLastName: string = "";
  //UserStreetName: string = "";
  //UserStreetNumber: string = "";
  //UserEmail: string = "";
  //UserPhoneNumber: string = "";
  //UserPhoneAreaCode: string = "";
  //UserMobileNumber: string = "";
  //UserMobileAreaCode: string = "";
  //CityId: string = "";
  //ImageFullPath: string = "";
  //ImageThumbPath: string = "";
  //HazardType: string = "";

  //isSetAddressByGPS: boolean = true;

  //isMobileUser: boolean;
  //latAndLangForGoogle: string;

  //validation
  //isValidSumary: boolean;
  //isValidCityName: boolean;
  //isValidStreet: boolean;
  //isValidStreetNum: boolean;
  //isValidDescription: boolean;
  isValidDescriptionAndImage: boolean;
  //isValidCityNameMesseg: string;
  isValidStreetMesseg: string;
  //isValidDescriptionMesseg: string;
  isValidStreetNumMesseg: string;
  isValidCorporationMesseg: string;
  MandatoryStreets: boolean;

  //imageHazardReport
  //image_fileName: string;
  //image_file: string;
  //image_fullFileNameForDB
  //isReportWithImage: boolean;
  call106fileModel: call106FileModel;
  call106fileModelList: any = new Array();
  //maxFileValid: boolean;


  fullstreetNamesList: any = new Array();
  stateCtrl: FormControl;
  streetNamesList: Observable<any[]>;

  currentCityID: string;

  // Corporition
  isCorporation: boolean = false;
  ListCorporation:string;
  Corporation:string;
  fileValidation : string;
  constructor(private valid: ValidationService, private getLoctaionSer: GetLoctaionService,
     private jsonService: GetJsonService, private route: ActivatedRoute,
      private router: Router, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.currentCityID = params['city'];
      this.getClientDetailByMgarId(params['city']);
    });
   
   // this.stateCtrl = new FormControl();
  }

  ngOnInit() {
    this.loadDeleteFileFunction();
    this.GetCorporationAuthorities(this.currentCityID);
  }

  getClientDetailByMgarId(city) {
    if(!city)
    this.commonService.log("mast-error-getCityDetailFromDB", this.router.url,"web");
    
    let data = this.EwaPost.getCityDetailFromDB(city);
    this.jsonService.sendData(data).subscribe(res => {
      this.ClientId = res[0].ClientId;
      this.MandatoryStreets = res[0].MandatoryStreets;
      this.CityName = res[0].AppName;
      this.AppId = res[0].AppId;     
      this.commonService.setTitleAndDescription("otherServices",this.CityName," פניה למוקד 106 ");      
      this.loadStreetList();
    }, err => {
      //alert(err);
    });

  }


  loadStreetList() {
    this.params = new Array<InputParams>();
    this.dataToSend = new Array<ActionInputParams>();
    this.actionName = "1fa0f3c5-a016-4b8a-9faf-de1017a94ccb";

    this.param = new InputParams('@ClientId', this.ClientId);
    this.params.push(this.param);
    this.param = new InputParams('@key', this.StreetName);
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_KeepItCity', '');

    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

      this.fullstreetNamesList = res;
      this.stateCtrl = new FormControl();
      this.streetNamesList = this.stateCtrl.valueChanges
        .startWith(null)
        .map(state => state ? this.filterStates(state) : this.fullstreetNamesList.slice());
    }, err => {
      //alert(err);
    });

  }
  filterStates(name: string) {
    return this.fullstreetNamesList.filter(state =>
      state.Name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  uploadFile(event) {

    // if (this.call106fileModelList.length > 1) {
    //   this.maxFileValid = true;
    //   return false;
    // }
    // else { this.maxFileValid = false; }

    let files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let x = files[i].name.split(".");
        let imageType = "." + x[1];
        this.getBase64(files[i], imageType);
      }
    }
  }

  getBase64(file, imageType) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(this.valid.base64MimeType(reader.result, fileType.image))
      {
        this.fileValidation = "סוג קובץ אינו חוקי";
        return;
      }      
      this.fileValidation = null;

      var canvas = document.createElement("canvas");
      var img = document.createElement("img");
      img.src = reader.result;
      img.width = 300;
      img.height = 300;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");

      setTimeout(() => {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataurl = canvas.toDataURL("image/png");
        this.call106fileModel = new call106FileModel();
        this.call106fileModel.file = dataurl//reader.result;
        this.call106fileModel.id = this.commonService.guid();
        this.call106fileModel.file_name = this.commonService.guid() + imageType;
        this.call106fileModel.fullFileNameForDB = 'images/cities/' + this.currentCityID + '/' + this.call106fileModel.file_name;
        if(this.call106fileModelList.length > 1)
        this.fileValidation = "מקסימום 2 קבצים מותרים";
        else{
        this.fileValidation = null;
        this.call106fileModelList.push(this.call106fileModel);
        $(".meter_upload").append("<div class='upload-wrap'><img src='" + this.call106fileModel.file + "' class='meter_img' ><a id='" + this.call106fileModel.id + "' class='delbtn removebtn'><img id='" + this.call106fileModel.id + "' src='assets/img/close-white.png' /></a></div>");
        $(".meter_upload").addClass('upload-meter-show');
        }
      }, 1000);
    };
    reader.onerror = (error) => {
      //console.log('Error: ', error);
    };
  }


  //שלב א בשליחה
  sendHazardReportImage() {

    if (!this.validSumeryCallFun()) {
      this.valid.setFocusToLastAlertForAccessibility("form_2", 2);
      return false;
    }

    if (this.call106fileModelList.length == 0) { }
    else {
      this.call106fileModelList.forEach(element => {
        this.sendFilesToAmazonStoreg(element);
      });
    }
    this.insertHazardReport();


  }

  sendFilesToAmazonStoreg(fileModel) {
    this.actionName = 'f79885f8-c284-41e8-8f42-f8cee0c6ed66';
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();

    this.param = new InputParams('', fileModel.file);
    this.params.push(this.param);
    this.param = new InputParams('', fileModel.file_name);
    this.params.push(this.param);
    this.param = new InputParams('', this.currentCityID);
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'PayLogic', 'PayLogic.PayLogicClass')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

    }, err => {
      //alert(err);
    });
  }

  // שלב ב בשליחה
  insertHazardReport() {

    this.actionName = 'f82b416a-0af2-4eac-871d-8501dbc3ab37';
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.param = new InputParams("@CityName", this.CityName);
    this.params.push(this.param);
    this.param = new InputParams("@StreetName", this.StreetName);
    this.params.push(this.param);
    this.param = new InputParams("@StreetNumber", this.StreetNumber);
    this.params.push(this.param);
    this.param = new InputParams("@Description", this.Description);
    this.params.push(this.param);
    this.param = new InputParams("@ClientId", this.ClientId);
    this.params.push(this.param);
    this.param = new InputParams("@PayerId", "12");
    this.params.push(this.param);
    this.param = new InputParams("@AppId", this.AppId);
    this.params.push(this.param);

     //user param    
     this.param = new InputParams("@UserFirstName",this.commonService.userDetails[0].FirstName);
     this.params.push(this.param);
     this.param = new InputParams("@UserLastName",this.commonService.userDetails[0].LastName);
     this.params.push(this.param);   
     this.param = new InputParams("@UserEmail",this.commonService.userDetails[0].Email);
     this.params.push(this.param);
     this.param = new InputParams("@UserMobileNumber",this.commonService.userDetails[0].Phone);
     this.params.push(this.param);

    try {
      this.param = new InputParams("@FullImagePath", this.call106fileModelList[0].fullFileNameForDB , "img");
      this.params.push(this.param);
      this.param = new InputParams("@ImageThumbPath", this.call106fileModelList[0].fullFileNameForDB , "img");
      this.params.push(this.param);
      this.param = new InputParams("@FullImagePath2", this.call106fileModelList[1].fullFileNameForDB , "img");
      this.params.push(this.param);
      this.param = new InputParams("@ImageThumbPath2", this.call106fileModelList[1].fullFileNameForDB, "img");
      this.params.push(this.param);
    } catch (e) {

    }

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_KeepItCity', 'InsertNewHazardReport');
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

      if (res[0].HazardId != 0) {
        $(".alertSign").show();
        setTimeout(() => {
          $(".alertSign").hide();
          this.router.navigate(["user/" + this.currentCityID + "/prev-106-call"]);
        }, 3000);

      }
      else {
        alert("אירעה שגיאה בשליחה")
      }

    }, err => {
      //alert(err);
    });


  }


  validDescriptionAndImageFun() {
    this.isValidDescriptionAndImage = this.valid.validDescriptionAndImageFun(this.Description, this.call106fileModelList.length);
  }
  validStrretFromTheListFun() {
    this.isValidStreetMesseg = this.valid.validItemInListFun(this.fullstreetNamesList , this.StreetName, "Name"); 
  }
  validStreetNameFun() {
    setTimeout(() => {
      this.isValidStreetMesseg = this.valid.validNameFun(this.StreetName, "streetName"); 
    }, 100);
    }
  validStreetNumberFun() {    
    this.isValidStreetNumMesseg = this.valid.validStreetNumberFun(this.StreetNumber);
  }
  
  validCorporationFun() {
    this.isValidCorporationMesseg = this.valid.validCorporationFun(this.ListCorporation, this.Corporation);
  }

  validSumeryCallFun() {
    this.validStreetNameFun();
    this.validStreetNumberFun();
    if(this.isCorporation)
    this.validCorporationFun();
    this.validDescriptionAndImageFun();
    if (this.MandatoryStreets) { this.validStrretFromTheListFun(); }

    if (this.isValidStreetMesseg != null || this.isValidStreetNumMesseg != null
      || this.isValidDescriptionAndImage ||this.isValidCorporationMesseg !=null)
      return false
    else
      return true;
  }







  loadDeleteFileFunction() {
    $(".meter_upload").on('click', '.delbtn', (e) => {
      let $this = e.target;

      this.call106fileModelList =
        this.call106fileModelList.filter(file => file.id != $this.getAttribute('id'))
      if ($this.tagName == 'IMG')
        $this.parentElement.parentElement.remove();
      else {
        $this.parentElement.remove();
      }
    });
  }

// Moshe 10337 07-10-2018
GetCorporationAuthorities(city: string) {
    
  this.dataToSend = new Array<ActionInputParams>()
  this.params = new Array<InputParams>();
  this.actionName = '4ed8d8e1-f6bf-4230-b956-b6b4c16a0f92';
  this.params = new Array<InputParams>();
 
  this.param = new InputParams("@CorporationId", city);
  this.params.push(this.param);
 
  this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
  this.dataToSend.push(this.singleDataObj);
  this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_KeepItCity', 'GetCorporationAuthoritiesPerCorporationId')
  this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

    if (res.length <= 1)
     {
      this.ListCorporation = null;
      this.isCorporation = false;
     }
    else {        
      this.ListCorporation =  res ;        
      this.isCorporation = true;
    }

  }, err => {

  });

}

setCorporation(e) {
  this.Corporation = e.target.value;  
  this.CityName = this.Corporation;
}


}
