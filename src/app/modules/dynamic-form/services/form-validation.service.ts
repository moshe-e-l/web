import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FormValidationService {
    
    validEmptyFiled(item , controlType) {

        let res = null;
        if(controlType == "dropdown" || controlType == "textbox"){     
        if (item == "" || item == undefined || item == null) {
            res = "הינו שדה חובה";
         }      
        }
        if(controlType == "checkbox"){    
          if(!item)
            res = "חייב להיות מסומן";
        }
        return res;
    }
    
    validHebLetterFun(item) {
        // first name
        let res = null;
        if(item){
        if (!/^[()"-.'0-9\u0590-\u05FF\s/g]+$/.test(item)) {
            res = "חייב להיות מורגב מאותיות בעברית בלבד";
        }             
      } 
        return res;
    }
    validEmailFun(item) {
        let res = null;
        //email
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(item)) {
            res = "אינו חוקי"; // "כתובת אימייל אינה חוקית";
        }       
        return res;
    }
    validPhoneFun(item) {
        let res = null;
        //phone
        if (!/^\d+$/.test(item) || !/^05\d([-]{0,1})\d{7}$/.test(item)) {
            res = "אינו חוקי";  //"מספר טלפון אינו חוקי";      
        }              
        return res;
    }
    validTZFun(item) {
        let res = null;
        //TZ
        if (!this.checkFakeTZ(item)) {
            res = "אינו חוקי"; // "מספר תעודת זהות אינו חוקי";       
        }        
        return res;
    }
    checkFakeTZ(item) {
        if (item) {
            var mone = 0, incNum;
            for (var i = 0; i < 9; i++) {
                incNum = Number(item.charAt(i));
                incNum *= (i % 2) + 1;
                if (incNum > 9)
                    incNum -= 9;
                mone += incNum;
            }
            if (mone % 10 == 0)
                return true;
            else
                return false;
        }
        return false;
    }

   validOnlyDigits(item) {
        let res = null;
        if (!/^\d+$/.test(item)) {
            res = "חייב להכיל מספרים בלבד";  //"מספר נכס אינו חוקי";   
        }       
        return res;
    }

    validNumberRange(min, max, value){
        let res = null;
        if(max == 0)
        {
        if(value.length < min)
          res = "חייב להכיל לפחות " + min + "תווים ";
         }
         if(min == 0)
         {
            if(value.length > max)
            res = "חייב להכיל עד " + min + "תווים ";

         }
         else
         {
             if(value.length < min || value.length > max)
             {
                res = "חייב להכיל בין " + min + " ל " + max + " תווים";
             }
         }
         return res;
    }
  
    validItemInListFun(list, selectedItem, nameParam) {
        let res = null;

        res = "חייב להיות מתוך הרשימה";
        var city: any;
        switch (nameParam) {
            case "AppName":
                city = list.filter(c => c.AppName == selectedItem);
                break;
            case "AuthoritieName":
                city = list.filter(c => c.AuthoritieName == selectedItem);
                break;
            case "Name":
                city = list.filter(c => c.Name == selectedItem);
                break;
            default:
                break;
        }

        if (city) {
            if (city.length > 0) {
                res = null;
            }
        }
        return res;
    }
    
   
    validCompare(one, tow)
    {
        let res = null;
        if(one!=tow)
          res = "ערך אינו זהה";
        return res;       
    }   

   
}
