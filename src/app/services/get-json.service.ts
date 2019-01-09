import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';


declare var NativeApp: any;

@Injectable()
export class GetJsonService {
   
   public BASE_FORM_URL="";
   public BASE_PAY24_URL:string ="";
   public BASE_CREDIT_DETAIL_URL = "";
   private BASE_URL ="";
   public ORIGIN= "";

   public token: string= "";

   private header = new Headers({
         'Content-Type': 'application/json',       
    //   'Content-Type': 'application/x-www-form-urlencoded',     
    //   'Accept' : 'text/json'  
});

   constructor(private http: Http) {
       this.getOrigin();
   }

   sendData(params: any) { 
    this.header.set("token",this.getCookie("token")); 
      return this.http.post(this.BASE_URL + '/' + params.folder + '/' + params.method+ '/', params.ActionInputParams, {headers: this.header})
          .map(res => res.json())      
      .catch(this.handleError);
   }

   get(url: any) {    
     return this.http.get(url,{headers: this.header})
         .map(res => res.json())      
     .catch(this.handleError);
  }

   
   getOrigin()
   {
     this.ORIGIN = window.location.origin;
     if( this.ORIGIN =="http://localhost:4200" ||  this.ORIGIN == "http://localhost:4201" ||  this.ORIGIN == "http://localhost:4202" )
     {
         this.BASE_PAY24_URL = "https://www.pay24.co.il/payDesign/SearchPay/SearchPay";
         this.BASE_URL = 'http://localhost:8005';
         this.BASE_FORM_URL = "https://dev.mast.co.il/forms/StatusNetForms/DynamicForm.aspx";
         this.BASE_CREDIT_DETAIL_URL = "https://www.pay24.co.il/payDesign/Registration/Registration"; 
         
     }
     if( this.ORIGIN == "https://devapp.mast.co.il"  ||  this.ORIGIN == "https://dev.mast.co.il")
     {
        this.BASE_PAY24_URL = "http://pay.mast.co.il/payDesign/SearchPay/SearchPay"
        this.BASE_URL = 'https://devapi.mast.co.il';
        this.BASE_FORM_URL = "https://dev.mast.co.il/forms/StatusNetForms/DynamicForm.aspx";
        this.BASE_CREDIT_DETAIL_URL = "https://pay.mast.co.il/payDesign/Registration/Registration";

     }
     if( this.ORIGIN == "https://app.mast.co.il"  ||  this.ORIGIN == "https://www.mast.co.il")
     {
        this.BASE_PAY24_URL = "https://www.pay24.co.il/payDesign/SearchPay/SearchPay";
        this.BASE_URL = 'https://apiweb.mast.co.il';
        this.BASE_FORM_URL = "https://mast.co.il/forms/StatusNetForms/DynamicForm.aspx";
        this.BASE_CREDIT_DETAIL_URL = "https://www.pay24.co.il/payDesign/Registration/Registration";  
    } 
     this.BASE_PAY24_URL = "https://www.pay24.co.il/payDesign/SearchPay/SearchPay";
     this.BASE_CREDIT_DETAIL_URL = "https://pay.mast.co.il/payDesign/Registration/Registration";
    // this.BASE_URL = 'https://api.mast.co.il';
    // this.BASE_FORM_URL = "https://mast.co.il/forms/StatusNetForms/DynamicForm.aspx";
   }


   private handleError(error: any) {
    let customMesseg ='אנא התחבר מחדש למערכת.'
 
    if(error.status==504)
    {
       error.statusText = customMesseg;  
       document.cookie = "token" + "=" + '' +  "; path=/";
       location.href= ""; 
    }
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';        
    console.error(errMsg); 
    return Observable.throw(errMsg);
}
    

   getCookie(name)
   {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            this.token= c.substring(cookieName.length, c.length);
            // הגדרת הטוקן בתור ההאדר 
           // this.header.set("token",this.token);
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';

   }
  
   createCookie(name,value,days)
   {  
    if(days ==""){
        days = 1;
     }  
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));  
    expires = "; expires=" +date.toUTCString();    

    document.cookie = name + "=" + value + expires +  "; path=/"; // לסשן אחד     
   }
   

 
  

}
