import { AfterViewInit, Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DEVICE_TYPE, DEVICE_LOCATION, RESPONSE_TYPE } from '@app/market/data/device-const';
import { NgForm } from '@angular/forms';
import { MarketService } from '@app/market/services/market.service';
import { DeviceService } from '@app/commons/services/device.service';
import format from 'xml-formatter';

@Component({
  selector: 'sb-ng-popup',
  templateUrl: './ng-popup.component.html',
  styleUrls: ['./ng-popup.component.scss']
})
export class NgPopupComponent implements OnInit, AfterViewInit {
  @ViewChild('content') templateRef!: TemplateRef<any>;
  @ViewChild('f') deviceForm!: NgForm;
  @Output() closeEvent = new EventEmitter<void>();
  
  deviceTypeList: any = [];
  deviceLocationList: any[] = [];
  responseTypeList: any[] = [];
  invalid: boolean = false;
  testPayload: any;
  jsonFlag!: boolean;
  responseType: any;
  deviceAddress: any;

  constructor(
    private modalService: NgbModal,
    private marketService: MarketService,
    private deviceService: DeviceService
    ) {}

  ngOnInit() {
    this.deviceTypeList = DEVICE_TYPE;
    this.deviceLocationList = DEVICE_LOCATION;
    this.responseTypeList = RESPONSE_TYPE;
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
      const type = this.deviceTypeList.find((val: any) => val.name === form.value.deviceType);
      const location = this.deviceLocationList.find((val: any) => val.name === form.value.deviceLocation);
      form.value.deviceType = type.value;
      form.value.deviceLocation = location.value;
      
      this.marketService.addDevice(form.value).subscribe(res => {
      });
      this.modalService.dismissAll();
    } else {
      this.invalid = true;
    }
  }

  onConnect(address: any) {
    this.deviceService.getDeviceDataByResource(address).subscribe(res => {
      this.testPayload = res;
      this.jsonFlag = true;
    }, err => {
      this.deviceService.getDeviceDataByResourceNotJson(address).subscribe(res => {
        try {
          this.testPayload = format(res);
        } catch(e) {
          this.testPayload = res;
        }
        this.jsonFlag = false;
      });
    });
  }
}
