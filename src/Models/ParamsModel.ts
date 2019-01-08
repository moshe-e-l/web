export class InputParams {
    Name: string;
    Value: string = "";
    Type: string;

    constructor(Name, Value , Type = null) {
        this.Name = Name;
        this.Value = Value
        this.Type = Type;
    }
}

export class ActionInputParams {
    ActionName: string;
    InputParamsCollection: InputParams[]
}

export class FullActionInputParams {
    ActionInputParams: ActionInputParams[];
    folder: string;
    method: string;

    constructor(ActionInputParams, folder, method) {
        this.ActionInputParams = ActionInputParams;
        this.folder = folder;
        this.method = method;
    }
}
export class EvaDataStructure {

    FullActionInputParams: FullActionInputParams;
    dataToSend: any = new Array<ActionInputParams>();
    singleDataObj: any = new ActionInputParams();

    BuildDataStructure(actionName, params, folder, method) {
        this.dataToSend = new Array<ActionInputParams>();
        this.singleDataObj = { ActionName: actionName, InputParamsCollection: params }
        this.dataToSend.push(this.singleDataObj);
        return new FullActionInputParams(this.dataToSend, folder, method);
    }

    // common requests 
    getCityDetailFromDB(city: string) {        
        return this.BuildDataStructure('B11BB4F4-E773-424D-AC61-CBD6721D0455',
        [{Name : "@MgarId" , Value: city }] , "MastApi_KeepItCity", "GetClientIdByMgarId");
    }

    getCityDetailFromUmbraco(city: string){
        return this.BuildDataStructure('8ca4ad2a-c1ad-493f-b739-0ef203904ec7',
        [{Name : "city" , Value: city }] , "MastApi_WebAdmin", "DAL.Umbraco.BLumbraco/");
    }
    getUserDetail(){
        return this.BuildDataStructure('160c4e28-8115-4903-95fc-52c3b12c0f3e',
        [{Name : "@Phone" , Value: "12" },
         {Name : "@PayerId" , Value: "12" }] 
        , "MastApi_Pay24", "GetUserDetails");
    }
}