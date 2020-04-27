import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dataset } from '@modules/tables/models/dataset.model';
import { DatasetService } from '@modules/tables/services/dataset.service';
import { ActivatedRoute } from '@angular/router';

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
      of(this.datasetService.getDataset(this.route.snapshot.params.id))
      .subscribe(val => {
        this.dataset = val;
      });
  }

}
