import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantListComponent } from './plant-list.component';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant.interface';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plantServiceSpy: jasmine.SpyObj<PlantService>;

  beforeEach(async () => {
    plantServiceSpy = jasmine.createSpyObj('PlantService', ['getPlants', 'resetPagination']);
    
    await TestBed.configureTestingModule({
      imports: [PlantListComponent, HttpClientTestingModule],
      providers: [{ provide: PlantService, useclass: plantServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should load plants on init', () => {
      const mockPlants: Plant[] = [{ id: 1, name: 'Plant1'}, { id: 2, name: 'Plant2'}];
      const mockResponse = { results: mockPlants, next: null };

      plantServiceSpy.getPlants.and.returnValue(of(mockResponse));
      component.ngOnInit();
      fixture.detectChanges();

      expect(plantServiceSpy.getPlants).toHaveBeenCalled();

      component.plants$.subscribe( plants => {
        expect(plants.length).toBe(2);
        expect(plants).toEqual(mockPlants);

      });
  });

  xit('should handle errors while loading plants', () =>{
    plantServiceSpy.getPlants.and.returnValue(throwError({ message: 'Error loading plants'}));

      component.ngOnInit();
      fixture.detectChanges();
      expect(plantServiceSpy.getPlants).toHaveBeenCalled();

      component.errorMessage$.subscribe( errorMessage => {
        expect(errorMessage).toEqual('Error loading plants');
      })
  });

  xit('should refresh plants', () =>{
    const mockPlants: Plant[] = [{ id: 1, name: 'Plant1'}, { id: 2, name: 'Plant2'}];
    const mockResponse = { results: mockPlants, next: null };

    plantServiceSpy.getPlants.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    component.refreshPlants();

    expect(plantServiceSpy.resetPagination).toHaveBeenCalled();
    expect(plantServiceSpy.getPlants).toHaveBeenCalled();

    component.plants$.subscribe(plants => {
      expect(plants.length).toBe(2);
      expect(plants).toEqual(mockPlants);
    });

  });

  it('should track plant by id', ()=> {
    const plant: Plant = { id: 1, name: 'Plant1'};
    expect(component.trackByPlantId(0, plant)).toBe(1);
  })

  it('should complete destroy$ on ngOnDestroy', ()=>{
    component.ngOnDestroy();
    expect(component['destroy$'].isStopped).toBeTrue();
  })

});
