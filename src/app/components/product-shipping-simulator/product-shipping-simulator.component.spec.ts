import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShippingSimulatorComponent } from './product-shipping-simulator.component';

describe('ProductShippingSimulatorComponent', () => {
  let component: ProductShippingSimulatorComponent;
  let fixture: ComponentFixture<ProductShippingSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductShippingSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShippingSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
