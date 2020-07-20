import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '@app/market/services/dataset.service';
import { DEVICE_TYPE, DEVICE_LOCATION } from '@app/market/data/device-const';
import { translateDeviceTypeLocation } from '@app/commons/utils/dataset.util';

@Component({
    selector: 'sb-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {
    dataType!: string;
    datasets: any;

    constructor(
        public route: ActivatedRoute,
        private datasetService: DatasetService
        ) {}
    
    ngOnInit() {
        this.route.url.subscribe(params => {
            this.dataType = params[0].path === 'bundles' ? 'bundle' : 'stream';
        });

        this.datasetService.getDatasetsByType(this.dataType).subscribe((res: any) => {
            res.forEach((element: any) => {
                element = translateDeviceTypeLocation(element);
            });
            this.datasets = translateDeviceTypeLocation(res);
        });
    }

}
