import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { StorageErrorBannerComponent } from './shared/components/storage-error-banner/storage-error-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, TranslatePipe, StorageErrorBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
