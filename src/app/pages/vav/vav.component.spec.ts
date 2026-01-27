import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VavComponent } from './vav.component';

describe('VavComponent', () => {
  let component: VavComponent;
  let fixture: ComponentFixture<VavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
