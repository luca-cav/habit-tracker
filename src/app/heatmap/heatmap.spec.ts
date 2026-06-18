import { TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { HeatmapComponent } from './heatmap';

describe('HeatmapComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatmapComponent],
      providers: [
        provideTranslateService({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeatmapComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
