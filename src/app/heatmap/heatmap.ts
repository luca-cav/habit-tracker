import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './heatmap.html',
  styleUrl: './heatmap.scss',
})
export class HeatmapComponent {}
