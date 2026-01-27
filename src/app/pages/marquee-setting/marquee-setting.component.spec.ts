import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarqueeSettingComponent } from './marquee-setting.component';


describe('MarqueeSettingComponent', () => {
  let component: MarqueeSettingComponent;
  let fixture: ComponentFixture<MarqueeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarqueeSettingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarqueeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a marquee list with data', () => {
    expect(component.marqueeList.length).toBeGreaterThan(0);
  });
});
