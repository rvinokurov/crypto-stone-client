import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import {polyfill} from 'mobile-drag-drop';
// optional import of scroll behaviour
import {scrollBehaviourDragImageTranslateOverride} from 'mobile-drag-drop/scroll-behaviour';

polyfill({
  // use this to make use of the scroll behaviour
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});

// workaround to make scroll prevent work in iOS Safari > 10
try {
  window.addEventListener('touchmove', function () {
  }, {passive: false});
} catch (e) {
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
