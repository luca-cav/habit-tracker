import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-storage-error-banner',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    @if (showBanner()) {
      <div role="alert" tabindex="0" class="storage-error-banner">
        {{ 'ERRORS.STORAGE_UNAVAILABLE' | translate }}
      </div>
    }
  `,
  styles: [`
    .storage-error-banner {
      background: #b71c1c;
      color: #fff;
      padding: 12px 16px;
      text-align: center;
      font-weight: 500;
      width: 100%;
      box-sizing: border-box;
    }
  `],
})
export class StorageErrorBannerComponent {
  private readonly storageService = inject(StorageService);
  protected readonly showBanner = computed(
    () => !this.storageService.isAvailable() || this.storageService.hasError(),
  );
}
