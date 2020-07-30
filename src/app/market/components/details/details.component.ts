import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { translateDeviceTypeLocation } from '@app/commons/utils/dataset.util';
import { Dataset } from '@app/market/models/dataset.model';
import { DatasetService } from '@app/market/services/dataset.service';
import { PurchaseService } from '@app/market/services/purchase.service';

@Component({
  selector: 'sb-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  dataset!: Dataset;
  datasetMetadata!: Dataset;
  downloadJsonHref!: any;
  downloadJsonHrefMetadata!: any;
  
  pathId!: string;
  filename!: string;
  subscribed: boolean = false;

  constructor(
      private datasetService: DatasetService,
      private purchaseService: PurchaseService,
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.pathId = this.route.snapshot.params.id;
    this.datasetService.getDatasetDetails(this.pathId).subscribe(res => {
      this.dataset = translateDeviceTypeLocation(res);
    });

    this.purchaseService.getPurchasedDatasets().subscribe((res: any) => {
      res.forEach((element: any) => {
          if(this.pathId === element.dataset._id) {
            this.subscribed = true;
          }
      });
    });
    
    this.filename = `Bundle_${new Date().getTime()}.json`;
    this.generateDownloadJsonUri();
  }

  onClick() {
    this.purchaseService.updatePurchasedDatasets(this.pathId).subscribe();
    this.subscribed = true;
  }

  private generateDownloadJsonUri() {
    this.datasetService.getDatasetDetailsUnwrapped(this.pathId).subscribe(res => {
      this.downloadJsonHref = this.createUri(res);
    });
    this.datasetService.getDatasetDetailsUnwrappedMetadata(this.pathId).subscribe(res => {
      this.downloadJsonHrefMetadata = this.createUri(res);
    }); 
  }

  private createUri(res: any) {
    const theJSON = JSON.stringify(res);
    return this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  }

}
