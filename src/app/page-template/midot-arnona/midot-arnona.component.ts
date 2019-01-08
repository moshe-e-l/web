import { Component, OnInit } from '@angular/core';
 
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InputParams, ActionInputParams, FullActionInputParams, EvaDataStructure } from '../../../Models/ParamsModel';
import { GetJsonService } from '../../services/get-json.service';
import { arnonaModel } from '../../../Models/arnona-model';

@Component({
  selector: 'app-midot-arnona',
  templateUrl: './midot-arnona.component.html',
  styleUrls: ['./midot-arnona.component.css']
})
export class MidotArnonaComponent implements OnInit {
   

  actionName: string;
  FullActionInputParams: FullActionInputParams;
  dataToSend: any = new Array<ActionInputParams>();
  singleDataObj: any = new ActionInputParams();
  params: any = new Array<InputParams>();
  param: InputParams;
  EwaPost: EvaDataStructure = new EvaDataStructure();


  fast_mast_code:string
  companyId:string;

  assetList: any;
  arnonaImageList:any= new Array();
  arnonaItam:arnonaModel;
  iframeLink:string;
  constructor(private route: ActivatedRoute, private router: Router, public commonService: CommonService, private jsonService: GetJsonService) {
    
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
    this.dataToSend = new Array<ActionInputParams>()
    this.params = new Array<InputParams>();
    this.actionName = '7ff39d2e-d866-4440-8b43-e7095356d092';        
    this.param = new InputParams("@Code",this.fast_mast_code);
    this.params.push(this.param);
    // Update: get the data per the client id also 
    this.param = new InputParams("@ClientId",this.companyId);
    this.params.push(this.param);

    this.singleDataObj = { ActionName: this.actionName, InputParamsCollection: this.params }
    this.dataToSend.push(this.singleDataObj);
    this.FullActionInputParams = new FullActionInputParams(this.dataToSend, 'MastApi_KeepItCity','');
    this.jsonService.sendData(this.FullActionInputParams).subscribe(res => {
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
