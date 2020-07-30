import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketService } from '@app/market/services/market.service';

@Component({
    selector: 'sb-dashboard-cards',
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    @Input() removeState!: boolean;
    @Input() deviceList!: any[];
    
    constructor(
        private router: Router,
        private marketService: MarketService
        ) {}

    ngOnInit() {}

    onRemoveEvent(id: string) {
        const found = this.deviceList.findIndex((element: any) => element._id == id);
        this.deviceList.splice(found, 1);

        this.marketService.removeDevice(id).subscribe();
    }

    onGetDetailsEvent(id: string) {
        this.router.navigate(['market/share/details', id]);
        
        // For future reference
        // this.router.navigate(['details', id], { relativeTo: this.route });
    }
}
