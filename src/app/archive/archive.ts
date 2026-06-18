import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './archive.html',
  styleUrl: './archive.scss',
})
export class ArchiveComponent {}
