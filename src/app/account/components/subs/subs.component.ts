import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatasetService } from '@app/market/services/dataset.service';
import { PurchaseService } from '@app/market/services/purchase.service';

@Component({
  selector: 'sb-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.scss']
})
export class SubsComponent implements OnInit {
  @ViewChild('downloadRef') private downloadRef!: ElementRef;
  datasetList: any = [];
  filename!: string;
  downloadJsonHref!: any;
  pathId!: string;

  constructor(
    private purchaseService: PurchaseService,
    private datasetService: DatasetService
  ) { }

  ngOnInit() {
    this.purchaseService.getPurchasedDatasets().subscribe((res: any) => {
      const streamList = res.filter((stream: any) => {
        return stream.dataset.internalType === 'stream'
      });

      streamList.forEach((element: any) => {
        this.datasetList.push(element.dataset);
      });
    });

    this.filename = `Stream_${new Date().getTime()}.json`;
  }

  onUnsubscribe(id: string) {
    this.purchaseService.deletePurchasedDatasets(id).subscribe();
    
    const found = this.datasetList.findIndex((element: any) => element._id == id);
    this.datasetList.splice(found, 1);
  }

  onGet(id: string) {
    this.datasetService.getDatasetDetailsUnwrapped(id).subscribe(res => {
      this.downloadFile(res);
    });
  }

  private downloadFile(res: any) {
    const ref = this.downloadRef.nativeElement;
    const theJSON = JSON.stringify(res);
    const binaryData: any = [];
    binaryData.push(theJSON);
    const url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/json"}));
    
    ref.href = url;
    ref.download = this.filename;
    ref.click();
  }

}
