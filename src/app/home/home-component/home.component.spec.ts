import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],

    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

  });
  it('should create', () => {
    expect(comp).toBeTruthy();
  });
  it(`should NOT have any numbers in list before ngOnInit`, () => {
    expect(comp.staggeringNumbers.length).toBe(0, 'numbers list is empty before init');
  });

  it(`should get the numbers List after ngOnInit`, waitForAsync(async () => {
    await fixture.whenStable();

    fixture.detectChanges();
    // This triggers the ngOnInit and thus the _getData() method
    expect(comp.staggeringNumbers.length).toBeGreaterThan(0, 'numbers list exists after init');
  }));
});

