import { AfterViewInit, Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DEVICE_TYPES, DEVICE_LOCATIONS } from '@app/market/data/device-const';
import { NgForm } from '@angular/forms';
import { MarketService } from '@app/market/services/market.service';

@Component({
  selector: 'sb-ng-popup',
  templateUrl: './ng-popup.component.html',
  styleUrls: ['./ng-popup.component.scss']
})
export class NgPopupComponent implements OnInit, AfterViewInit {
  @ViewChild('content') templateRef!: TemplateRef<any>;
  @ViewChild('f') deviceForm!: NgForm;
  @Output() closeEvent = new EventEmitter<void>();
  
  deviceTypeList: string[] = [];
  deviceLocationList: string[] = [];
  invalid: boolean = false;

  constructor(
    private modalService: NgbModal,
    private marketService: MarketService
    ) {}

  ngOnInit() {
    this.deviceTypeList = DEVICE_TYPES;
    this.deviceLocationList = DEVICE_LOCATIONS;
  }
  
  ngAfterViewInit(): void {
    this.openModal(this.templateRef);
  }
  
  openModal(content: any) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeEvent.emit();
    }, (reason) => {
      this.closeEvent.emit();
    });
  }

  onSubmit(form: any) {
    if(form.valid) {
      this.marketService.addDevice(form.value).subscribe(res => {
      });
      this.modalService.dismissAll();
    } else {
      this.invalid = true;
    }
  }

}
