import { TestBed } from '@angular/core/testing';

import { PlantService } from './plant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Plant } from '../models/plant.interface';

describe('PlantService', () => {
  let service: PlantService;
  let httpMock: HttpTestingController;

  const mockPlant: Plant = { id: 1, name: 'Aloe Vera', description: 'A medicinal plant' };
  const apiUrl = 'https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantService]
    });
    service = TestBed.inject(PlantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch plants list', ()=> {
    const mockResponse = {
      results: [mockPlant],
      next: null,
      count: 1
    };

    service.getPlants().subscribe((data) => {
      expect(data.results.length).toBe(1);
      expect(data.results[0]).toEqual(mockPlant);
      expect(data.next).toBeNull();
      expect(data.count).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}?offset=0&limit=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

  });

  it('should fetch plant details by ID', ()=> {

    service.getPlantDetails('1').subscribe((data) => {
      expect(data).toEqual(mockPlant);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlant);

  });

  it('should handle errors on getPlants', ()=> {
    service.getPlants().subscribe(
      () => fail('should have failed with an error'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`${apiUrl}?offset=0&limit=10`);
    req.flush('Error fetching plants', { status: 500, statusText: 'Server Error' });

  });

  it('should handle errors on getPlantDetails', ()=> {
    service.getPlantDetails('invalid-id').subscribe(
      () => fail('should have failed with an error'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/invalid-id`);
    req.flush('Error fetching plant details', { status: 404, statusText: 'Not Found' });
  })

  it('should reset pagination offset', ()=> {
    service.resetPagination();
    expect((service as any).offset).toBe(0);
  });

});
