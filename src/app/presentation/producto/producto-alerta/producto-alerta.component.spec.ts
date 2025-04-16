import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAlertaComponent } from './producto-alerta.component';

describe('ProductoAlertaComponent', () => {
  let component: ProductoAlertaComponent;
  let fixture: ComponentFixture<ProductoAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoAlertaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
