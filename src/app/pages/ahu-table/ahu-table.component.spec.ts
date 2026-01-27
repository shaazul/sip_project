import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhuTableComponent } from './ahu-table.component';

describe('AhuTableComponent', () => {
  let component: AhuTableComponent;
  let fixture: ComponentFixture<AhuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhuTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
