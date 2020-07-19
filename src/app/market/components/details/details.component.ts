import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dataset } from '@app/market/models/dataset.model';
import { DatasetService } from '@app/market/services/dataset.service';
import { of } from 'rxjs';

@Component({
  selector: 'sb-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  dataset!: Dataset;

  constructor(
      public datasetService: DatasetService,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
      // of(this.datasetService.getDataset(this.route.snapshot.params.id))
      // .subscribe(val => {
      //   this.dataset = val;
      // });
  }

}
