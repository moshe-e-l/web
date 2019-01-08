import { Component, OnInit } from '@angular/core';
 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GetJsonService } from '../../services/get-json.service';
import { FullActionInputParams, ActionInputParams, InputParams } from '../../../Models/ParamsModel';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-payment-page',
  templateUrl: './user-payment-page.component.html',
  styleUrls: ['./user-payment-page.component.css']
})
export class UserPaymentPageComponent implements OnInit {

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();
  params: any = new Array<InputParams>();
  param: InputParams;

  currentCityName: string;
  currentCityId: string;
  iframeSrc: string = '';
  isFormLink: boolean = false;

  constructor(private router: Router, private jsonService: GetJsonService,
     public commonService: CommonService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.currentCityId = (params['child'] ? params['child'] : params['city']);   
     if(this.router.url.includes("QR_TAG")){
        this.isFormLink = true;
        this.getTokenForUserPay(this.currentCityId, params["stub"], params["payerId"]);
      }
    });
    
    if (this.currentCityId.toString() == "9999") {
      this.router.navigate(['']);
    }
     this.commonService.isLogInUserReceivedSource.first().subscribe(
      (isLogIn) => {      
        if (isLogIn) {
          this.getTokenForUserPay(this.currentCityId, "0", "123");
        }
        else{
          this.iframeSrc = this.jsonService.BASE_PAY24_URL + "?ReshutMast=" + this.currentCityId +
          "&payOrigin="+(this.commonService.isMobileUser ? "MAST_Web_Mobile":"MAST_Web");
      }}
    )
    this.getPaymentTypeName();
  }

  getPaymentTypeName() {
    this.actionName = '28860fde-3181-4333-a66e-48900e7ff846';
    this.dataToSend = new Array<ActionInputParams>();
    this.params = new Array<InputParams>();
    this.param = new InputParams("@ComepenyId", this.currentCityId);
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_Pay24', '');
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      this.currentCityName = res[0].result;
      this.commonService.setTitleAndDescription("payment",this.currentCityName,"");
    }, err => {
      //alert(err);
    });

  }


  getTokenForUserPay(compenyId, stub, payerId) {
    this.actionName = 'f31aa8bb-8c90-465d-8f61-aa3562574010';
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.param = new InputParams("@CompanyId", compenyId);
    this.params.push(this.param);
    this.param = new InputParams("@StubCode", stub);
    this.params.push(this.param);
    this.param = new InputParams((this.commonService.isLogInUser ? "@PayerId" : "payerId"), payerId);
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'PayLogic', 'PayLogic.PayLogicClass')
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      if (res.Name == "errorWS") {
        alert("WS is down");
        return false;
      }
      this.iframeSrc = this.jsonService.BASE_PAY24_URL +
       (this.isFormLink ? "?linkToken=" : "?token=") + res.Value +
      "&payOrigin="+(this.commonService.isMobileUser ? "MAST_Web_Mobile":"MAST_Web");
    }, err => {
      //alert(err);
    });
  }

  ngOnInit() {

  }



}
