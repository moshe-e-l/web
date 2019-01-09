import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FastMastService{
    activeStep : string;
    code : string;
    clientId: string;
    FMuserDetails:any;
}