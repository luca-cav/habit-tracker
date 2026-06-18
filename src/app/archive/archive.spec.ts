import { TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { ArchiveComponent } from './archive';

describe('ArchiveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ArchiveComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
