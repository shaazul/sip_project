import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbComponent } from './pdb.component';

describe('PdbComponent', () => {
  let component: PdbComponent;
  let fixture: ComponentFixture<PdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
