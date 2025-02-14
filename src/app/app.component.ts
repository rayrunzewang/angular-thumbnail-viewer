import { Component, OnDestroy } from '@angular/core';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ThumbsComponent } from './components/thumbs/thumbs.component';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule, ViewerComponent, ThumbsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  images = [
    'https://placehold.co/300',
    'https://placehold.co/400',
    'https://placehold.co/500',
    'https://placehold.co/600'
  ];

  currentIndex = 0;
  slideshowActive = false;
  slideshowSubscription: Subscription | null = null;

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

  toggleSlideshow(event: Event) {
    this.slideshowActive = !this.slideshowActive;
    this.slideshowActive ? this.startSlideshow() : this.stopSlideshow();
  }

  startSlideshow() {
    this.stopSlideshow();
    this.slideshowSubscription = interval(3000).subscribe(() => this.nextImage());
  }

  stopSlideshow() {
    this.slideshowSubscription?.unsubscribe();
    this.slideshowSubscription = null;
  }

  ngOnDestroy() {
    this.stopSlideshow();
  }
}
