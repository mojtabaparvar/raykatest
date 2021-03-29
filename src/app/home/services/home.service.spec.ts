import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { AddNMultiplyModel, HomeService, NumbersModel } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpClientSpy: { get: jasmine.Spy };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return expected Numbers', waitForAsync(async () => {
    const expectedNumbers: NumbersModel[] = [{
      "value": 1,
      "action": "add"
    }
    ];
    httpClientSpy.get.and.returnValue(of(expectedNumbers));
    service.getNumbersJson().subscribe(
      data => expect(data).toEqual(expectedNumbers, 'expected numbers'),
      fail
    );
  }));
  it('should return expected Addition Data', waitForAsync(async () => {
    const expectedAdditionData: AddNMultiplyModel = {
      "value": 1,
    }
      ;
    httpClientSpy.get.and.returnValue(of(expectedAdditionData));
    service.getAdditionJson().toPromise().then(
      data => expect(data).toEqual(expectedAdditionData, 'expected Addition Data'),
    );
  }));
  it('should return expected Multiply Data', waitForAsync(async () => {
    const expectedMultiplyData: AddNMultiplyModel = {
      "value": 12,
    }
      ;
    httpClientSpy.get.and.returnValue(of(expectedMultiplyData));
    service.getMultiplyJson().toPromise().then(data => expect(data).toEqual(expectedMultiplyData, 'expected Multiply Data'),
    );
  }));


  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(of(errorResponse));
    service.getNumbersJson().subscribe(
      data => fail('expected an error, not data'),
      error => expect(error.message).toContain('test 404 error')
    );
    service.getAdditionJson().subscribe(
      data => fail('expected an error, not data'),
      error => expect(error.message).toContain('test 404 error')
    );
    service.getMultiplyJson().subscribe(
      data => fail('expected an error, not data'),
      error => expect(error.message).toContain('test 404 error')
    );
  });
});
