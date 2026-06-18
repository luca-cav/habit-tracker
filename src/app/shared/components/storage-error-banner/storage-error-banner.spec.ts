import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { TranslateNoOpLoader, provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { StorageErrorBannerComponent } from './storage-error-banner';
import { StorageService } from '../../services/storage.service';

describe('StorageErrorBannerComponent', () => {
  let fixture: ComponentFixture<StorageErrorBannerComponent>;

  const setup = (available: boolean, hasError: boolean) => {
    const errorSignal = signal(hasError);
    const mockStorageService = {
      isAvailable: () => available,
      hasError: errorSignal.asReadonly(),
    };

    TestBed.configureTestingModule({
      imports: [StorageErrorBannerComponent],
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        provideTranslateService({ lang: 'en', loader: provideTranslateLoader(TranslateNoOpLoader) }),
      ],
    });
    fixture = TestBed.createComponent(StorageErrorBannerComponent);
    fixture.detectChanges();
    return errorSignal;
  };

  afterEach(() => TestBed.resetTestingModule());

  it('should NOT show banner when storage is available and no error', () => {
    setup(true, false);
    const banner = fixture.nativeElement.querySelector('.storage-error-banner');
    expect(banner).toBeNull();
  });

  it('should show banner when isAvailable() returns false', () => {
    setup(false, false);
    const banner = fixture.nativeElement.querySelector('.storage-error-banner');
    expect(banner).not.toBeNull();
  });

  it('should show banner when hasError() is true', () => {
    setup(true, true);
    const banner = fixture.nativeElement.querySelector('.storage-error-banner');
    expect(banner).not.toBeNull();
  });

  it('should have role="alert" and tabindex="0" when visible', () => {
    setup(false, false);
    const el = fixture.nativeElement.querySelector('[role="alert"]');
    expect(el).not.toBeNull();
    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('should show banner reactively when hasError transitions from false to true', () => {
    const errorSignal = setup(true, false);
    expect(fixture.nativeElement.querySelector('.storage-error-banner')).toBeNull();

    errorSignal.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.storage-error-banner')).not.toBeNull();
  });
});
