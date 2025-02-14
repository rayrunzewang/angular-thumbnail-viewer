import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-thumbs',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './thumbs.component.html',
  styleUrls: ['./thumbs.component.scss']
})
export class ThumbsComponent {
  @Input() images: string[] = [];
  @Input() currentIndex!: number;
  @Output() selectImage = new EventEmitter<number>();

  prevImage() {
    if (this.images.length > 0) {
      this.selectImage.emit((this.currentIndex - 1 + this.images.length) % this.images.length);
    }
  }
  nextImage() {
    if (this.images.length > 0) {
      this.selectImage.emit((this.currentIndex + 1) % this.images.length);
    }
  }

  select(index: number) {
    this.selectImage.emit(index);
  }
}
