import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsFiltersComponent } from './all-products-filters.component';

describe('AllProductsFiltersComponent', () => {
  let component: AllProductsFiltersComponent;
  let fixture: ComponentFixture<AllProductsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
