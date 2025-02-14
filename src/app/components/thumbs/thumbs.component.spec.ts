import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThumbsComponent } from './thumbs.component';

describe('ThumbsComponent', () => {
  let component: ThumbsComponent;
  let fixture: ComponentFixture<ThumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThumbsComponent);
    component = fixture.componentInstance;
    component.images = ['img1', 'img2', 'img3'];  
    component.currentIndex = 1;  
    spyOn(component.selectImage, 'emit'); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct index when navigating to the next image', () => {
    component.nextImage();
    expect(component.selectImage.emit).toHaveBeenCalledWith(2);
  });

  it('should emit the correct index when navigating to the previous image', () => {
    component.prevImage();
    expect(component.selectImage.emit).toHaveBeenCalledWith(0);
  });

  it('should emit the correct index when selecting a specific image', () => {
    component.select(2);
    expect(component.selectImage.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit anything if images array is empty', () => {
    component.images = [];
    component.currentIndex = 0;
    
    component.nextImage();
    component.prevImage();
    
    expect(component.selectImage.emit).not.toHaveBeenCalled();
  });
});
