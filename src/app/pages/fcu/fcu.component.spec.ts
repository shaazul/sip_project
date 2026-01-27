import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcuComponent } from './fcu.component';

describe('FcuComponent', () => {
  let component: FcuComponent;
  let fixture: ComponentFixture<FcuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FcuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
