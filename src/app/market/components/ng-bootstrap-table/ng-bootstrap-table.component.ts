import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Dataset } from '@app/market/models/dataset.model';
import { DatasetService } from '@app/market/services/dataset.service';

@Component({
    selector: 'sb-ng-bootstrap-table',
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() datasets: any;
    @Input() type!: string;

    constructor(
        public datasetService: DatasetService,
        private changeDetectorRef: ChangeDetectorRef,
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        
    }
    

}
