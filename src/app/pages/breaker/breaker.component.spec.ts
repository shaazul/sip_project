import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakerComponent } from './breaker.component';

describe('BreakerComponent', () => {
  let component: BreakerComponent;
  let fixture: ComponentFixture<BreakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
