import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {environment} from '../environments/environment';
import {registerLicense} from '@syncfusion/ej2-base';
import {fromEvent, map, merge, of, Subscription} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';

registerLicense(environment.syncfusionLicense);

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => inject(DOCUMENT).defaultView!,
  },
);

export const NAVIGATOR = new InjectionToken<Navigator>(
  'An abstraction over window.navigator object',
  {
    factory: () => inject(WINDOW).navigator,
  },
);

@Component({
  selector: 'ih-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('content', {read: ElementRef})
  content: ElementRef<HTMLElement> | undefined;

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  private readonly window: Window = inject(WINDOW);
  private readonly navigator: Navigator = inject(NAVIGATOR);

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.authService.initialize();
    this.checkNetworkStatus();

    this.router.events.subscribe((event): void => {
      if (event.constructor.name === 'NavigationEnd') {
        this.content?.nativeElement.scroll(0, 0);
      }
    });
  }

  checkNetworkStatus(): void {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(this.window, 'online'),
      fromEvent(this.window, 'offline'),
    )
      .pipe(map(() => this.navigator.onLine))
      .subscribe((status) => {
        this.networkStatus = status;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }
}
