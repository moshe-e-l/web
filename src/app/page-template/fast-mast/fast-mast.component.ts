import { Component, OnInit, AfterViewInit,  } from '@angular/core';
 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FullActionInputParams, ActionInputParams, InputParams, EvaDataStructure } from '../../../Models/ParamsModel';
import { GetJsonService } from '../../services/get-json.service';
import { CommonService } from '../../services/common.service';
import { dynamicLinkModel } from '../../../Models/dynamicLinkModel';
import { MainTemplateComponent } from '../../main-template/main-template.component';
import {fast_Mast_blockModel} from  '../../../Models/blocksModel'

@Component({
  selector: 'app-fast-mast',
  templateUrl: './fast-mast.component.html',
  styleUrls: ['./fast-mast.component.css']
})
export class FastMastComponent implements OnInit,AfterViewInit {
  
   

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();;
  params: any = new Array<InputParams>();
  param: InputParams;
  EwaPost: EvaDataStructure = new EvaDataStructure();

  isMobileUser:boolean;
  cityParams: any = new Array<InputParams>();
  
  cityLogo: string = "";
  cityName: string; 
  currentCityID:string;

  // blocks method
   parentId:string;
   intetnal_blocks:any= new Array();
   external_blocks:any= new Array();
   content_page_blocks:any= new Array();
   parent_blocks:any= new Array();

   fast_Mast:fast_Mast_blockModel= new fast_Mast_blockModel();  

  constructor(public commonService:CommonService, private router: Router, private route: ActivatedRoute, private jsonService: GetJsonService, private parent:MainTemplateComponent) {
    this.route.params.subscribe((params: Params) => {
      this.currentCityID = params['city'];          
      this.fast_Mast.code= params['code'];
      this.parentId=params['parent'];
     
      if(this.commonService.cityModel.Id!=this.currentCityID)
      this.commonService.getCityDetailFromUmbraco(this.currentCityID,"otherServices" ,"fast-mast");  
      else
      this.commonService.setTitleAndDescription("otherServices", this.commonService.cityModel.name,"fast-mast");
     
      this.GetcityBlockChildFromUmbraco(this.parentId, 'parent'); 
   
    });
    
  }

   

// ********bolck method*******

GetcityBlockChildFromUmbraco(cityId: string, type:string) {
  this.dataToSend = new Array<ActionInputParams>()
  this.params = new Array<InputParams>();
  this.actionName = '3e290245-6cf4-4ffb-9813-905a7dd11d57';
  
  this.param = new InputParams("city",cityId);
  this.params.push(this.param);
  this.param = new InputParams("type",type); //parent or city
  this.params.push(this.param);
  this.param = new InputParams("web-or-app","WEB");
  this.params.push(this.param);

  this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
  this.dataToSend.push(this.singleDataObj);
  this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_WebAdmin','DAL.Umbraco.BLumbraco/');
  this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
    this.setBlockLists(res);    
  }, err => {}
    //alert(err)
  );    
}

setBlockLists(blocks)
{    
  this.parent_blocks= new Array();
  this.external_blocks= new Array();
  this.intetnal_blocks= new Array();   
  this.content_page_blocks= new Array();
  
  blocks.forEach(element => {
  let jsonResult = JSON.parse(element.Value);   
  if(element.Name== 'parent_blocks')
  {
    if(jsonResult.hideInApp != 1)     
    {this.parent_blocks.push(jsonResult);}     
  }
  if(element.Name== 'external_block')
  {
    if(jsonResult.hide != 1)     
    {this.external_blocks.push(jsonResult);}
  }
  if(element.Name== 'internal_block')
  {
    if(jsonResult.hide != 1)     
    {this.intetnal_blocks.push(jsonResult);}

  }
  if(element.Name== 'content_page_block')
  {
    this.content_page_blocks.push(jsonResult);  
  }
  if(element.Name== 'fast_mast_block')
  { 
    this.fast_Mast= new fast_Mast_blockModel();
    this.fast_Mast.id = jsonResult.id;
    this.fast_Mast.location = jsonResult.location;
  }
    
  });

}
  
  external_blockFun(ex)
  {
    if(ex.openLinkInNewWindow=="1")
    { 
      window.open(ex.link+ "&k="+ this.fast_Mast.code);
    }
    else
    {
      location.href= ex.link+ "&k="+ this.fast_Mast.code;
    }
  }
  internal_blockFun(link)
  {
    this.router.navigate([link+"/"+this.fast_Mast.code])
  }
    
  ngOnInit() {   
    this.isMobileUser= this.commonService.getIsMobileUser();  
  }

  ngAfterViewInit(): void { 
          
  }



}

