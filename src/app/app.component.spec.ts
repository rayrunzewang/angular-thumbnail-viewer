import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ThumbsComponent } from './components/thumbs/thumbs.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, ViewerComponent, ThumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create correct component', () => {
    expect(component).toBeTruthy();
  });

  it('should slide to next image', () => {
    const initialIndex = component.currentIndex;
    component.nextImage();
    expect(component.currentIndex).toBe((initialIndex + 1) % component.images.length);
  });

  it('should slide to previous image', () => {
    const initialIndex = component.currentIndex;
    component.prevImage();
    expect(component.currentIndex).toBe((initialIndex - 1 + component.images.length) % component.images.length);
  });

  it('should change to image with selected index', () => {
    component.selectImage(2);
    expect(component.currentIndex).toBe(2);
  });

  it('should start or stop carousel correctly', fakeAsync(() => {
    const eventOn = new Event('change');
    Object.defineProperty(eventOn, 'target', { value: { checked: true }, writable: false });

    component.toggleSlideshow(eventOn);
    expect(component.slideshowActive).toBeTrue();

    tick(3000);
    const firstIndex = component.currentIndex; 
    tick(3000);
    expect(component.currentIndex).toBe((firstIndex + 1) % component.images.length);

    const eventOff = new Event('change');
    Object.defineProperty(eventOff, 'target', { value: { checked: false }, writable: false });

    component.toggleSlideshow(eventOff);
    expect(component.slideshowActive).toBeFalse();
  }));

  it('should cancel carousel subscription', () => {
    component.startSlideshow();
    expect(component.slideshowSubscription).toBeTruthy();

    component.stopSlideshow();
    expect(component.slideshowSubscription).toBeNull();
  });
});
