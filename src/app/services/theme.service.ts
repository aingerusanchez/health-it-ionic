import { Injectable } from '@angular/core';
// SERVICES
import { StorageService, StorageKey } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public darkMode: boolean;

  constructor(private storage: StorageService) { }

  public async initTheme() {
    const prefThemeDark = await this.storage.getItem(StorageKey.DARK_MODE);
    // If there is a user preference saved, fix to it
    if (prefThemeDark.value) {
      this.toggleTheme((prefThemeDark.value === 'true'));
    } else {
      // Otherwise, set to `prefers-color-scheme`
      this.toggleTheme(this.checkDarkMode());
    }
  }

  /** Return if `prefers-color-scheme` is dark */
  private checkDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /** Toggle between light/dark themes, and save as user-preferece */
  public toggleTheme(changeToDarkTheme: boolean): void {
    document.body.classList.toggle('dark', changeToDarkTheme);
    this.storage.setItem(StorageKey.DARK_MODE, changeToDarkTheme.toString());
    this.darkMode = changeToDarkTheme;
  }
}
