import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dataset } from '@app/market/models/dataset.model';
import { DatasetService } from '@app/market/services/dataset.service';
import { of } from 'rxjs';
import { DEVICE_TYPE, DEVICE_LOCATION } from '@app/market/data/device-const';
import { translateDeviceTypeLocation } from '@app/commons/utils/dataset.util';

@Component({
  selector: 'sb-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  dataset!: Dataset;
  pathId!: string;

  constructor(
      public datasetService: DatasetService,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pathId = this.route.snapshot.params.id;
    this.datasetService.getDatasetDetails(this.pathId).subscribe(res => {
      this.dataset = translateDeviceTypeLocation(res);
    });
  }

  onGet() {
    this.datasetService.getDatasetDetailsUnwrapped(this.pathId).subscribe(res => {
      console.log(res);
    });
  }

  onSubscribe() {

  }

}
