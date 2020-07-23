import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '@app/market/services/purchase.service';
import { Dataset } from '@app/market/models/dataset.model';

@Component({
  selector: 'sb-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.scss']
})
export class SubsComponent implements OnInit {
  datasetList: any = [];

  constructor(
    private purchaseService: PurchaseService
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
  }

  onUnsubscribe(id: string) {
    this.purchaseService.deletePurchasedDatasets(id).subscribe();
    
    const found = this.datasetList.findIndex((element: any) => element._id == id);
    this.datasetList.splice(found, 1);
  }

}
