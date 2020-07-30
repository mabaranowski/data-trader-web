import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '@app/auth/services/user.service';
import { MarketService } from '@app/market/services/market.service';

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
