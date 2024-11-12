import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCardComponent } from './common-card.component';
import { Plant } from '../../models/plant.interface';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommonCardComponent', () => {
  let component: CommonCardComponent;
  let fixture: ComponentFixture<CommonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonCardComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display plant data when input is provided', ()=> {

    const plantData: Plant = {
      id: 1,
      name: 'Aloe Vera'
    };

    component.plant = plantData;
    fixture.detectChanges();

    const plantNameElement = fixture.debugElement.query(By.css('.card-title'));
    expect(plantNameElement.nativeElement.textContent).toContain('Aloe Vera');
  });

  xit('should update display when plant input changes', async()=> {
    const initialPlantData: Plant = {
      id: 1,
      name: 'Aloe Vera'
    };

    const newPlantData: Plant = {
      id: 2,
      name: 'Basil'
    };

    component.plant = initialPlantData;
    fixture.detectChanges();

    let plantNameElement = fixture.debugElement.query(By.css('.card-title'));
    expect(plantNameElement.nativeElement.textContent).toContain('Aloe Vera');

    component.plant = newPlantData;
    fixture.detectChanges();
    await fixture.whenStable();

    plantNameElement = fixture.debugElement.query(By.css('.card-title'));
    expect(plantNameElement.nativeElement.textContent).toContain('Basil');
  });

});
