import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);

  loadTheme(themeName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const themeSrc = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;

    if (themeSrc) {
      themeSrc.href = `assets/theme/${themeName}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `assets/theme/${themeName}.css`;

      head.appendChild(style);
    }
  }
}
