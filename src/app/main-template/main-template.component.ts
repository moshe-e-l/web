import { Component, AfterViewInit} from '@angular/core';
 
import { GetJsonService } from '../services/get-json.service';
import { Router, NavigationStart, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../services/common.service';
import { InputParams, ActionInputParams, FullActionInputParams, EvaDataStructure } from '../../Models/ParamsModel';
declare function playHeaderVideo()
@Component({
  selector: 'main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.css']
})

export class MainTemplateComponent implements AfterViewInit {
   
  lenguage: any = { text: 'he' };
  public items: Array<string> = ['he', 'en', 'Рус', 'عر',]

  cityLogo:string;
  currentPageArray: string[] = new Array();

  contentHeader: boolean;
  normalHeader: boolean;
  headerForPageWithoutReg:boolean;
  isChatIconShow: boolean = true;
  toShowStopAnimation:boolean;  
 
  isMobileUser:boolean;
 
  EwaPost: EvaDataStructure = new EvaDataStructure();

  popUpSubject : string;
  stopPopUpTimer:number = 3;
  interval:any;
  constructor(public commonService: CommonService,private router: Router, 
      private jsonService: GetJsonService, private route: ActivatedRoute) {
      
               
  }

ngAfterViewInit(){ 
  setTimeout(() => {
    let referrer = document.referrer;
    //console.log(referrer)
    //referrer = "234"
    if(referrer != "" && !referrer.includes("google") 
    && !referrer.includes("mast") && !referrer.includes("localhost")
     && this.router.url != "/")
    this.popUpSubject = "firstMsg";  
    this.interval = setInterval(()=> { 
      this.stopPopUpTimer-- ;
      if(this.stopPopUpTimer == 0)      
         this.closePopup();      
    },1500);  
  }, 100);
 
}

closePopup(){
  clearInterval(this.interval);
  this.popUpSubject = null;
}
 
  hamborgerScript() {
    $("header").toggleClass("someClass").fadeIn("slow");
  }
  shareScript() {
    $(".social_icons").toggleClass("open_social").toggle(500);
  }

  stopAnimation(){
  $(".header").addClass("stopAnimation").fadeIn("slow");
  }
  moveToMainContent()
  {  
    $(".mainContentForFocus").focus(); 
  }
  onRouteChange() {
    let token= this.jsonService.getCookie("token");
    window.scrollTo(0, 0);
    this.currentPageArray = this.router.url.split("/");
    
    if (this.currentPageArray[1] == '') // חלק עליון רגיל, רק אם זהו דף הבית     
    {
      this.normalHeader = true;
      this.headerForPageWithoutReg=false;
      this.contentHeader = false;
      this.toShowStopAnimation=true;
     
    }
   
    // האדאר מיוחד לדפים שאין בהם אפשרות להתחברות כי צריך שם סטייל אחר
    else if(this.currentPageArray[1] == 'content'||this.currentPageArray[1] == 'success-bill-to-mail'||
    this.currentPageArray[1]== 'registraion-log-in-page'||
    this.currentPageArray[2]=='manager-speech'|| token ||
    this.currentPageArray[2]=='city-content'||this.currentPageArray[1]=='city-content')  
    {
          this.headerForPageWithoutReg=true;
          this.normalHeader = false;
          this.contentHeader = false;
          this.toShowStopAnimation=false;         
    }
    else {
      this.contentHeader = true;
      this.headerForPageWithoutReg=false;
      this.normalHeader = false;     
      this.toShowStopAnimation=false;     
    }
    
   if(this.currentPageArray[1]!='user'&&this.currentPageArray[1]!='version-info'&&
   this.currentPageArray[1]!='not-found'&&this.currentPageArray[2]!='city-content'&&
   this.currentPageArray[1]!='content' && this.currentPageArray[1]!= "success-bill-to-mail"&&
   this.currentPageArray[2]!='search-engine'){
 
   

    if(token){
      if(!this.commonService.userDetails)
      this.getUserDetail();
      else
      this.router.navigate(['/user/'+this.commonService.userDetails[0].CompanyId+'/services']);  
    }
    }
  }
  
  getUserDetail() {
    let data =this.EwaPost.getUserDetail();
    this.jsonService.sendData(data).subscribe(res => {
      this.commonService.updatedUserDetailsSubject(res) 
      this.router.navigate(['/user/'+res[0].CompanyId+'/services']);      
    }, err => {   });
  
  }
  goToChatPage() {
    document.getElementById("openLinkInNewWindow").setAttribute("href",'http://31.154.43.1/chat/?skillset=WC_Chat_Clali')
    document.getElementById("openLinkInNewWindow").click();
  // window.open();    
  }




}


