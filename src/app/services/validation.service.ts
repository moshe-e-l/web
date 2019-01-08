import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ValidationService {

    //user
    validNameFun(item, name) {
        // first name
        let res = null;
        if ($("." + name).hasClass("inputErrorToFocus")) { $("." + name).removeClass("inputErrorToFocus") }
        if (!/^[()"-.'0-9\u0590-\u05FF\s/g]+$/.test(item)) {
            res = name + "MustHebLetters";
        }
        if (item.length == 1) {
            res = "minimumTwoLetters";
        }
        if (item == "") {
            res = "Must" + name;
        }
        if (res) {
            $("." + name).addClass("inputErrorToFocus");
        }
        return res;
    }
    validEmailFun(item) {
        let res = null;
        //email
        if ($(".email_address").hasClass("inputErrorToFocus")) { $(".email_address").removeClass("inputErrorToFocus") }

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(item)) {
            res = "invalidEmail"; // "כתובת אימייל אינה חוקית";
        }
        if (item == "") {
            res = "MustEmail";//"כתובת אימייל הינו שדה חובה";          
        }
        if (res) {
            $(".email_address").addClass("inputErrorToFocus");
        }
        return res;
    }
    validPhoneFun(item) {
        let res = null;
        //phone
        if ($(".cellphone_number").hasClass("inputErrorToFocus")) { $(".cellphone_number").removeClass("inputErrorToFocus") }

        if (!/^\d+$/.test(item) || !/^05\d([-]{0,1})\d{7}$/.test(item)) {
            res = "invalidPhone";  //"מספר טלפון אינו חוקי";      
        }
        if (item.length != 10) {
            res = "invalidPhoneLength" //"מספר טלפון חייב להיות באורך של עשר ספרות";       
        }
        if (item == "") {
            res = "MustPhone" //"טלפון הינו שדה חובה";    
        }
        if (res) {
            $(".cellphone_number").addClass("inputErrorToFocus");
        }
        return res;
    }
    validTZFun(item) {
        let res = null;
        //TZ
        if ($(".TZ").hasClass("inputErrorToFocus")) { $(".TZ").removeClass("inputErrorToFocus") }
        if (!this.checkFakeTZ(item)) {
            res = "invalidTZ"; // "מספר תעודת זהות אינו חוקי";       
        }
        //if(item){
        //    if(item.length > 9 || item.length < 5){
        //        res = "invalidTZ"; // "מספר תעודת זהות אינו חוקי"; 
        //    }
        //}
        if (item == "") {
            res = "MustTZ";  //"תעודת זהות הינה שדה חובה";
        }
        if (res) {
            $(".TZ").addClass("inputErrorToFocus");
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

    validTZFun2() {



    }

    validRegulationsFun(item) {
        let res = null;
        if ($(".regulationsReg").hasClass("inputErrorToFocus")) { $(".regulationsReg").removeClass("inputErrorToFocus") }
        if ($(".regulations").hasClass("inputErrorToFocus")) { $(".regulations").removeClass("inputErrorToFocus") }
        if (!item) {
            $(".regulationsReg").addClass("inputErrorToFocus");
            $(".regulations").addClass("inputErrorToFocus");
            return true;
        }
        else {
            return false;
        }
    }
    //asset 
    validAssetNumberFun(item) {
        let res = null;

        if ($(".assetNumber").hasClass("inputErrorToFocus")) { $(".assetNumber").removeClass("inputErrorToFocus") }

        if (!/^\d+$/.test(item)) {
            res = "invalidAssetNumber";  //"מספר נכס אינו חוקי";   
        }
        if (item.length < 5) {
            res = "invalidAssetNumberLength" //"מספר נכס חייב להיות גדול מארבע ספרות";    
        }
        if (item == "") {
            res = "MustAssetNumber" //"מספר נכס הינו שדה חובה";    
        }
        if (res) {
            $(".assetNumber").addClass("inputErrorToFocus");
        }
        return res;

    }
    validCitiNameFun(list, selectedItem): string {

        let res = null;
        $(".city_list").addClass("inputErrorToFocus");
        res = "chooseFromTheList";

        let city = list.filter(c => c.AppName == selectedItem);
        if (city.length > 0) {
            res = null;
            if ($(".city_list").hasClass("inputErrorToFocus")) { $(".city_list").removeClass("inputErrorToFocus") }
        }

        return res;
    }
    // TODO 
    // להעביר את כל הבדיקות ברשימות לשימוש בפונקצייה הזו
    validItemInListFun(list, selectedItem, nameParam) {
        let res = null;

        res = "chooseFromTheList";
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



    //106
    validStreetNumberFun(item) {
        let res = null;
        if ($("#strNum").hasClass("inputErrorToFocus")) { $("#strNum").removeClass("inputErrorToFocus") }

        if (item == "") {
            res = "streetNumIsMust";
        }
        if (/^-\d*\.?\d+$/.test(item)) { // למספרים שליליים      
            res = "numStreetNotValid";
        }
        if (res) {
            $("#strNum").addClass("inputErrorToFocus");
        }
        return res;
    }

    validCorporationFun(list, selectedItem): string {

        let res = null;
        $(".city_list").addClass("inputErrorToFocus");
        res = "chooseFromTheList";

        let city = list.filter(c => c.AuthoritieName == selectedItem);
        if (city.length > 0) {
            res = null;
            if ($(".city_list").hasClass("inputErrorToFocus")) { $(".city_list").removeClass("inputErrorToFocus") }
        }

        return res;



    }

    validDescriptionAndImageFun(des, img) {
        if ($("#type_text").hasClass("inputErrorToFocus")) { $("#type_text").removeClass("inputErrorToFocus") }
        if (des == "" && img == 0) {
            $("#type_text").addClass("inputErrorToFocus");
            return true;
        }
        return false;
    }

    validEmptyFiled(item, name) {
        if ($("." + name).hasClass("inputErrorToFocus")) { $("." + name).removeClass("inputErrorToFocus") }

        let res = null;
        if (item == "" || item == undefined || item == null) {
            res = name + "isMustFiled";
        }
        if (res) {
            $("." + name).addClass("inputErrorToFocus");
        }
        return res;
    }

    validSevenLetters(item, name) {
        if ($("." + name).hasClass("inputErrorToFocus")) { $("." + name).removeClass("inputErrorToFocus") }
        let res = null;
        if (item.length < 7) {
            res = name + "MustSevenLetters"
        }

        if (item == "" || item == undefined || item == null) {
            res = name + "isMustFiled";
        }
        if (res) {
            $("." + name).addClass("inputErrorToFocus");
        }
        return res;
    }
    validExactlySevenLetters(item, name) {
        if ($("." + name).hasClass("inputErrorToFocus")) { $("." + name).removeClass("inputErrorToFocus") }
        let res = null;
        if (item.length != 7) {
            res = name + "MustSevenLetters"
        }

        if (item == "" || item == undefined || item == null) {
            res = name + "isMustFiled";
        }
        if (res) {
            $("." + name).addClass("inputErrorToFocus");
        }
        return res;
    }
    validCompare(one, tow) {
        if (one != tow)
            return true;
        return false;
    }

    validChipFun(item, name) {
        if ($("." + name).hasClass("inputErrorToFocus")) { $("." + name).removeClass("inputErrorToFocus") }
        let res = null;
        if (item.length != 15) {
            res = name + "Must15Letters"
        }

        if (item == "" || item == undefined || item == null) {
            res = name + "isMustFiled";
        }
        if (res) {
            $("." + name).addClass("inputErrorToFocus");
        }
        return res;
    }

    base64MimeType(base64 : string, type: fileType) {
        // base64 string first five characters define the mime type of the file.
        let data = base64.split(',')[1].substring(0, 5).toUpperCase();
        switch (type) {
            case fileType.image:
                //        png                jpg
                if (data == "IVBOR" || data == "/9J/4")
                    return true;
                return false;
            default:
                return false;
        }
    }


    setFocusToLastAlertForAccessibility(formClassName, secondTimeOut) {
        setTimeout(() => {
            $("." + formClassName).find(".validationMesseg").first().attr("tabindex", "-1").focus();
        }, 200);
        setTimeout(() => {
            $("." + formClassName).find(".inputErrorToFocus").first().focus();
        }, secondTimeOut * 1000);
    }
}
export enum fileType {
    image = 1
}
