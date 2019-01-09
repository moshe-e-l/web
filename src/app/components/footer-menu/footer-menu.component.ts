import { Component, OnInit } from '@angular/core';
import { FullActionInputParams, ActionInputParams, InputParams } from "../../../Models/ParamsModel";
import { GetJsonService } from '../../services/get-json.service';
import { UmbracoPgae } from "../../../Models/UmbracoPageModel";
import { CommonService } from '../../services/common.service';
import { Router, NavigationExtras } from "@angular/router";
import { locale } from 'devextreme/localization';
import { ContentComponent } from '../../page-template/content/content.component';
 

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.css']
})
export class FooterMenuComponent implements OnInit {
  
  umbracoLinkPages: any = new Array<UmbracoPgae>();
  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();
  params: any = new Array<InputParams>();
  param: InputParams;

  counterLoadedLinks: number = 0;
  mastManagerLink:string;
  constructor(private contentPage: ContentComponent, private jsonService: GetJsonService,
     public commonService: CommonService, private router: Router) {
       this.mastManagerLink = (this.jsonService.ORIGIN == 'https://dev.mast.co.il' ?
        "https://dev.mast.co.il/Manager/Login.aspx" : "https://manager.mast.co.il/login.aspx")
      }
   ngOnInit() {  
        this.GetFooterMenuLinks();     
    }
  GetFooterMenuLinks() {
    this.dataToSend = new Array<ActionInputParams>();
    this.params = new Array<InputParams>();
    this.actionName = "fc679e69-27a8-4413-91a9-d6128d0732b9";
    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend,'MastApi_WebAdmin' , 'DAL.Umbraco.BLumbraco/')
  
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
   // this.commonService.updatedFooterLinks(res);
    this.commonService.updatedFooterLinksSubject(res);
     this.umbracoLinkPages = res;         
    }, err => {
      //alert(err);
    });

  }
  actionLink(page) {
  
    if (page.isInternal) {    
       this.router.navigate(['content/' +page.name]);
    }
    else {
      if(page.newWindow)
      {
        document.getElementById("openLinkInNewWindow").setAttribute("href",page.content)
        document.getElementById("openLinkInNewWindow").click();    
      }
      else{
        document.location.href=page.content;
      }

    }
  }
  


}
