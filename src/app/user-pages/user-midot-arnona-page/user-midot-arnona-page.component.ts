import { Component, OnInit } from '@angular/core';
 
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { EvaDataStructure } from '../../../Models/ParamsModel';
import { GetJsonService } from '../../services/get-json.service';
import { arnonaModel } from '../../../Models/arnona-model';

@Component({
  selector: 'app-user-midot-arnona-page',
  templateUrl: './user-midot-arnona-page.component.html',
  styleUrls: ['./user-midot-arnona-page.component.css']
})
export class UserMidotArnonaPageComponent implements OnInit {
     
  EwaPost: EvaDataStructure = new EvaDataStructure();

  companyId:string;
  cityName:string;
  fast_mast_code:string

  assetList: any = new Array();
  arnonaImageList:any= new Array();
  arnonaItam:arnonaModel;
  isMobilUser: boolean;
  iframeLink:string;

  constructor(private router: Router, private route: ActivatedRoute,
     public commonService: CommonService, private jsonService: GetJsonService) {
   
   
      this.route.params.subscribe((params: Params) => {
        this.fast_mast_code = params['code'];  
        this.companyId= params['city'];
      });   
       
        if(this.commonService.cityModel.Id!=this.companyId)
        this.commonService.getCityDetailFromUmbraco(this.companyId,"otherServices" ,"מידות ארנונה");  
        else
        this.commonService.setTitleAndDescription("otherServices", this.commonService.cityModel.name,"מידות ארנונה");
          
        this.GetUserDetailByFastMastCode();
   
     }
  GetUserDetailByFastMastCode()
  {       
     let data = this.EwaPost.BuildDataStructure("7ff39d2e-d866-4440-8b43-e7095356d092",
     [{Name : "@Code" , Value : this.fast_mast_code },
     {Name : "@ClientId" , Value : this.companyId }],
        'MastApi_KeepItCity', 'fastMastValidtion'); 
   this.jsonService.sendData(data).subscribe(res => {
     if(!res[0])
      return;
     this.assetList = new Array();
     this.assetList.push(res[0].AssetNum);
     this.getArnonaImages();

   }, err => {
     //alert(err);
   });
  
  }

 getArnonaImages() {
    this.assetList.forEach(element => {
    let url= 'assets/arnona_images/'+this.companyId+"/"+element+".pdf";
    if(this.checkIfFileExists())     
    {
     this.arnonaItam= new arnonaModel();
     this.arnonaItam.imageSrc= url;    
     this.arnonaItam.assetNumber=element;
     this.arnonaImageList.push(this.arnonaItam);
    }
   });   
 }

  // צריך תיקון
 checkIfFileExists()
 {
   return true;   
 }

 showPdf(link)
 {  
   this.iframeLink = link;
   $(".iframe_wrap").show();
 }

 closePdfDoc()
 {
  $(".iframe_wrap").hide();
 }
  ngOnInit() {
  }

}
