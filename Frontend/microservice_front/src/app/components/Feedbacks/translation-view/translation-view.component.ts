import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from '../../../Services_groupe/translation.service';

interface Translation {
  text: string;
  language: string;
}

@Component({
  selector: 'app-translation-view',
  templateUrl: './translation-view.component.html',
  styleUrls: ['./translation-view.component.css']
})
export class TranslationViewComponent implements OnInit {
  @Input() text: string = '';
  @Input() sourceLanguage: string = 'en';
  translations: Translation[] = [];
  loading = false;
  error: string | null = null;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    if (this.text) {
      this.loadTranslations();
    }
  }

  loadTranslations(): void {
    this.loading = true;
    this.error = null;

    this.translationService.translateText(
      this.text,
      this.sourceLanguage,
      'en' // Add default target language
    ).subscribe({
      next: (translation) => {
        this.translations = [translation];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load translations';
        this.loading = false;
      }
    });
  }
}
