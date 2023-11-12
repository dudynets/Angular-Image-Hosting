import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N, uk_UA} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import uk from '@angular/common/locales/uk';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {SharedModule} from './shared/shared.module';
import {AuthState} from './core/auth/state/auth.state';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {ServiceWorkerModule} from '@angular/service-worker';

registerLocaleData(uk);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NzLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    SharedModule,
    NzSpinModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [{provide: NZ_I18N, useValue: uk_UA}],
  bootstrap: [AppComponent],
})
export class AppModule {}
