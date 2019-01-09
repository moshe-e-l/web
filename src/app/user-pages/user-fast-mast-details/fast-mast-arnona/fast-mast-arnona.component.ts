import { Component, OnInit } from '@angular/core';
import { FastMastService } from '../../../services/fast-mast.service';

@Component({
  selector: 'app-fast-mast-arnona',
  templateUrl: './fast-mast-arnona.component.html',
  styleUrls: ['./fast-mast-arnona.component.css']
})
export class FastMastArnonaComponent implements OnInit {
   showPdf : boolean;
   iframeLink : string;
  constructor(public fastMastService: FastMastService) { 
  this.iframeLink = 'assets/arnona_images/'+this.fastMastService.clientId
                     +"/"+fastMastService.FMuserDetails.AssetNum+".pdf";
  }

  ngOnInit() {
  }
}
