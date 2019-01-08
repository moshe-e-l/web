import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FastMastService } from '../../../services/fast-mast.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-user-fast-mast-general',
  templateUrl: './user-fast-mast-general.component.html',
  styleUrls: ['./user-fast-mast-general.component.css'] 
})
export class UserFastMastGeneralComponent{

  constructor(public commonService: CommonService, public fastMastService :FastMastService,
    private route: ActivatedRoute, private router: Router,) { 
      this.route.params.subscribe((params: Params) => {
         this.fastMastService.clientId = params["city"];
         console.log(this.fastMastService.clientId)
      });
      this.fastMastService.activeStep = "details";
  }
 

}
