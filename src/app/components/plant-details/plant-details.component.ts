import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.interface';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss'
})
export class PlantDetailsComponent {
  plant$!: Observable<Plant | undefined>;
  errorMessage$!: Observable<string>;

  constructor(private route: ActivatedRoute, private plantService: PlantService){}

  ngOnInit(): void {
    this.plant$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const plantId = params.get('id');
        if (plantId) {
          return this.loadPlantDetails(plantId);
        }
        return of(undefined); 
      })
    );
    
    this.errorMessage$ = of('');
  }

  private loadPlantDetails(plantId: string): Observable<Plant | undefined> {
    return this.plantService.getPlantDetails(plantId).pipe(
      catchError(error => {
        this.errorMessage$ = of(error.message);
        return of(undefined); 
      })
    );
  }

}
