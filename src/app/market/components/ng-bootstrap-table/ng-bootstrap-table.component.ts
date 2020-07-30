import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '@app/market/services/dataset.service';

@Component({
    selector: 'sb-ng-bootstrap-table',
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit, OnChanges {
    @Input() datasets: any;
    @Input() type!: string;
    
    pageSize: number = 10;

    paginate: any;
    numberOfPages!: number;
    pageArray!: number[];
    currentPage!: number;

    constructor(
        public datasetService: DatasetService,
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!this.datasets) {
            this.numberOfPages = Math.ceil(this.datasets.length / this.pageSize);
            this.paginate = this.datasets.slice(0, this.pageSize);
            this.pageArray = Array(this.numberOfPages).fill(0).map((x, i) => i + 1);
            this.currentPage = 1;
        }
    }
    
    goToPage(page: any) {
        const sliceStart = (page - 1) * this.pageSize;
        const sliceEnd = page * this.pageSize;
        this.paginate = this.datasets.slice(sliceStart, sliceEnd);
        this.currentPage = page;
    }

    previousPage() {
        if(this.currentPage !== 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if(this.currentPage !== this.numberOfPages) {
            this.goToPage(this.currentPage + 1);
        }
    }

}
