import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewVersionCheckerService } from 'src/app/services/new-version-checker.service';

@Component({
  selector: 'app-new-version-checker',
  templateUrl: './new-version-checker.component.html',
  styleUrls: ['./new-version-checker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewVersionCheckerComponent {
  isNewVersionAvailable: boolean = true;
  newAppUpdateAvailableSubscription: Subscription;
  @Input() containerClasses: string;

  constructor(public newVersionCheckerService: NewVersionCheckerService) {}

  ngOnInit(): void {
    this.checkIfAppUpdated();
  }

  checkIfAppUpdated() {
    this.newAppUpdateAvailableSubscription =
      this.newVersionCheckerService.$isNewVersionAvailable.subscribe(
        (versionAvailableFlag: boolean) => {
          this.isNewVersionAvailable = versionAvailableFlag;
        }
      );
  }

  applyUpdate(): void {
    this.newVersionCheckerService.applyUpdate();
  }

  ngOnDestroy() {
    this.newAppUpdateAvailableSubscription?.unsubscribe();
  }
}
