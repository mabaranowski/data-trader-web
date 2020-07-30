import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from '@app/account/services/settings.service';

@Component({
  selector: 'sb-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('f') settingsForm!: NgForm;
  error!: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private settingsService: SettingsService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.settingsForm.valid) {
      if(this.settingsForm.value.password !== this.settingsForm.value.confirmPassword) {
        this.error = 'Passwords do not match';
        this.changeDetectorRef.markForCheck();
        return;
      }

      this.settingsService.checkPasswordValidity(this.settingsForm.value.currentPassword).subscribe(res => {
        if(res) {
          this.settingsService.changePassword(this.settingsForm.value.password).subscribe(res => {
            this.router.navigate(['/auth/login']);
          }, err => {
            this.error = err.error;
            this.changeDetectorRef.markForCheck();
          });
        } else {
          this.error = 'Incorrect password';
          this.changeDetectorRef.markForCheck();
          return;
        }
      })
    } else {
        this.error = 'All fields are required';
        this.changeDetectorRef.markForCheck();
    }
  }

}
