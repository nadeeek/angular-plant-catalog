import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonCardComponent } from '../common-card/common-card.component';
import { BehaviorSubject, catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CommonCardComponent],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.scss'
})
export class PlantListComponent implements OnInit, OnDestroy {
  private plantSubject = new BehaviorSubject<Plant[]>([])
  plants$: Observable<Plant[]> = this.plantSubject.asObservable();
  errorMessage$!: Observable<string>;
  hasMoreResults = false;
  private destroy$ = new Subject<void>();

  constructor(private plantService: PlantService){}

  ngOnInit(): void{
    this.plantService.resetPagination();
    this.loadPlants();
  }

  loadPlants(): void{
    this.plantService.getPlants().pipe(
      tap((data) => {
        this.hasMoreResults = !!data.next;
        this.errorMessage$ = of('');

        // Update the cumulative list of plants
        const currentPlants = this.plantSubject.value;
        this.plantSubject.next([...currentPlants, ...data.results])
      }),
      catchError((error) => {
        this.errorMessage$ = of(error.message);
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  refreshPlants(): void{
    this.plantSubject.next([]);
    this.plantService.resetPagination();
    this.loadPlants();
  }

  trackByPlantId(index: number, plant: Plant): number{
    return plant.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }

}
