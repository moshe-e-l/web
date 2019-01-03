import { Component, OnInit, AfterViewInit, AfterContentInit, ViewChild } from '@angular/core'; 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from '../../services/common.service';
import { FullActionInputParams, ActionInputParams, InputParams, EvaDataStructure } from '../../../Models/ParamsModel';
import { GetJsonService } from '../../services/get-json.service';
import { fast_Mast_blockModel } from '../../../Models/blocksModel'
import { MainTemplateComponent } from '../../main-template/main-template.component';
import { UserSideMenuComponent } from '../../components/user-side-menu/user-side-menu.component';


@Component({
  selector: 'app-user-services-page',
  templateUrl: './user-services-page.component.html',
  styleUrls: ['./user-services-page.component.css']
})
export class UserServicesPageComponent implements OnInit, AfterViewInit {
   

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();
  params: any = new Array<InputParams>();
  param: InputParams;
  EwaPost: EvaDataStructure = new EvaDataStructure();

  isCorrectFastMastCode: boolean;

  cityName: string;
  cityLogo: string = "";
  currentCityID: string;
  // blocks method
  parentId: string;
  intetnal_blocks: any = new Array();
  external_blocks: any = new Array();
  content_page_blocks: any = new Array();
  parent_blocks: any = new Array();

  fast_Mast: fast_Mast_blockModel;

  constructor(private route: ActivatedRoute, private router: Router, private parent: MainTemplateComponent, public commonService: CommonService, private jsonService: GetJsonService) {
    

    this.route.params.subscribe((params: Params) => {
      this.commonService.styleLoader = "position: absolute; right: 23%;";
      this.commonService.showLoader = true; 
      
      this.currentCityID = params['city'];
      this.parentId = params['parent'];
      this.commonService.updateIsLogInUserSubject(true);

      if(this.commonService.cityModel.Id!=this.currentCityID)
      this.commonService.getCityDetailFromUmbraco(this.currentCityID,"services" ,"");  
      else
      this.commonService.setTitleAndDescription("services", this.commonService.cityModel.name,"");
     
    
      if (this.parentId == undefined)
        this.GetcityBlockChildFromUmbraco(this.currentCityID, 'city');
      else
        this.GetcityBlockChildFromUmbraco(this.parentId, 'parent');
    });
  }
   ngAfterViewInit(){
        
   }
   //////
  // ********bolck method*******

  GetcityBlockChildFromUmbraco(cityId: string, type: string) {
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.actionName = '3e290245-6cf4-4ffb-9813-905a7dd11d57';

    this.param = new InputParams("city", cityId);
    this.params.push(this.param);
    this.param = new InputParams("type", type);//parent or city
    this.params.push(this.param);
    this.param = new InputParams("web-or-app", "WEB");
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_WebAdmin', 'DAL.Umbraco.BLumbraco/');

    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {

      //console.log(res);
      this.setBlockLists(res);

    }, err => { }
      //alert(err)
    );
  }


  setBlockLists(blocks) {
    this.parent_blocks = new Array();
    this.external_blocks = new Array();
    this.intetnal_blocks = new Array();
    this.content_page_blocks = new Array();
    //console.log(blocks);
    blocks.forEach(element => {

      let jsonResult = JSON.parse(element.Value);

      if (element.Name == 'parent_blocks') {
        if (jsonResult.hide != 1) { this.parent_blocks.push(jsonResult); }
      }
      if (element.Name == 'external_block') {
        if (jsonResult.hide != 1) { this.external_blocks.push(jsonResult); }
      }
      if (element.Name == 'internal_block') {
        if (jsonResult.hide != 1) { this.intetnal_blocks.push(jsonResult); }
      }
      if (element.Name == 'content_page_block') {
        this.content_page_blocks.push(jsonResult);
      }

      if (element.Name == 'fast_mast_block') {
        this.fast_Mast = new fast_Mast_blockModel();
        this.fast_Mast.id = jsonResult.id;
        this.fast_Mast.location = jsonResult.location;
      }

    });
      this.commonService.showLoader = false;
  }


  //////////////////end///////////////////////////


  GetUserDetailByFastMastCode() {
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.actionName = '7ff39d2e-d866-4440-8b43-e7095356d092';
    this.param = new InputParams("@Code", this.fast_Mast.code);
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_KeepItCity', 'fastMastValidtion');
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
      this.isCorrectFastMastCode = false;
      if (res[0].result == "invalid") {
        this.isCorrectFastMastCode = true;
        setTimeout(() => {
          $("#validFastMastDiv").attr("tabindex", "-1").focus();
        }, 200);

        setTimeout(() => {
          $("#MailForm").find(".fastMastInput").first().focus();
        }, 3000);
      }
      else {
        this.router.navigate(["user/" + this.currentCityID + "/fast-mast/" + this.fast_Mast.code + "/" + this.fast_Mast.id]);
      }

    }, err => {
      //alert(err);
    });

  }

  ngOnInit() {
  }

}
