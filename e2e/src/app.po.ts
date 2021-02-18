import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    // tslint:disable-next-line: no-any
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
