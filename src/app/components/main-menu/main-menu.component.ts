import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
// SERVICES
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  public appName: string = environment.appName;
  public appVersion: string = environment.version;
  public currenLang: string;

  constructor(
    public theme: ThemeService,
    public translate: TranslateService,
    private storage: StorageService,
  ) {
    // Init language
    this.storage.getItem(StorageKey.LANGUAGE).then(
      (lang: string) => {
        this.currenLang = lang || this.translate.defaultLang;
      }
    );
  }

  ngOnInit() { }

  public changeLang(lang: string): void {
    this.translate.use(lang);
    this.storage.setItem(StorageKey.LANGUAGE, lang);
    this.currenLang = lang;
  }
}
