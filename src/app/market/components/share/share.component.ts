import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MarketService } from '@app/market/services/market.service';
import { Devices } from '@app/market/models/device.model';
import { DeviceService } from '@app/commons/services/device.service';
import { map } from 'rxjs/operators';
import { UserService } from '@app/auth/services/user.service';

@Component({
  selector: 'sb-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  removeState: boolean = false;
  shareState: boolean = false;
  showPopup: boolean = false;
  deviceList: any = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private marketService: MarketService,
    private deviceService: DeviceService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fetchDevices();
    this.marketService.getShareFlag().subscribe((res: any) => {
      this.shareState = res;
    });
  }

  onAdd() {
    this.showPopup = !this.showPopup;
    this.removeState = false;
  }

  onRemove() {
    this.removeState = !this.removeState;
  }

  onCloseEvent() {
    this.onAdd();
    this.fetchDevices();
  }

  onShare(flag: boolean) {
    this.shareState = flag;
    this.marketService.updateShareFlag(flag).subscribe();
    this.userService.setUserSharing(flag);
  }

  private fetchDevices() {
    this.marketService.getDevices().subscribe(res => {
      this.deviceList = res;
      this.changeDetectorRef.markForCheck();
    });
  }

}
