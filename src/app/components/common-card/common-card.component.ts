import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Plant } from '../../models/plant.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './common-card.component.html',
  styleUrl: './common-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonCardComponent {
@Input() plant!: Plant;
}
