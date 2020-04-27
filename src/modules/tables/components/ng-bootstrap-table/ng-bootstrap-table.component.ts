import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Dataset } from '@modules/tables/models/dataset.model';
import { DatasetService } from '@modules/tables/services/dataset.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() pageSize = 10;

    datasets$!: Observable<Dataset[]>;
    total$!: Observable<number>;
    dataPath!: string;

    constructor(
        public datasetService: DatasetService,
        private changeDetectorRef: ChangeDetectorRef,
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.datasets$ = this.datasetService.datasets$;
        
        this.route.url.subscribe(params => {
            this.dataPath = params[0].path;
            this.datasets$ = of(this.datasetService.getDatasets(this.dataPath));
        });

        

        // this.countryService.pageSize = this.pageSize;
        // this.datasets$ = this.countryService.countries$;
        // this.total$ = this.countryService.total$;
    }

}
