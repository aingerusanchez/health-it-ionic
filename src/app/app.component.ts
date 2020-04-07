import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { ThemeService } from './services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService, StorageKey } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storage: StorageService,
    private translate: TranslateService,
    private theme: ThemeService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#28ba62' });
      }
    } catch (err) {
      console.warn('Esta ejecutando la app en un navegador', err);
    }
    this.initLanguage();
    this.theme.initTheme();
  }

  private async initLanguage() {
    const languages = ['es', 'eu', 'en'];
    this.translate.addLangs(languages);
    let lang = await this.storage.getItem(StorageKey.LANGUAGE);
    lang = lang || this.translate.getDefaultLang();
    this.translate.use(lang);
  }
}
