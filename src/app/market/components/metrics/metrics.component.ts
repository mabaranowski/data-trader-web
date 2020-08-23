import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MarketService } from '@app/market/services/market.service';

@Component({
  selector: 'sb-metrics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  @ViewChild('f') metricsForm!: NgForm;
  error!: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private marketService: MarketService
    ) { }

  ngOnInit(): void {
    this.marketService.getMetrics().subscribe(res => {
      this.metricsForm.setValue(res);
    }, err => {});
  }

  onSubmit() {
    if(this.metricsForm.valid) {
      this.marketService.updateMetrics(this.metricsForm.value).subscribe(res => { 
      }, err => {
        this.error = 'Error saving form';
        this.changeDetectorRef.markForCheck();
      });
    } else {
      this.error = 'Form is invalid';
      this.changeDetectorRef.markForCheck();
    }
  }

}
