import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Injector, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BusyTrackerService } from './service/busy-tracker.service';
import { BusyConfigHolderService } from './service/busy-config-holder.service';
import { Subscription } from 'rxjs';
import { NgBusyComponent } from './component/ng-busy/ng-busy.component';
import { InstanceConfigHolderService } from './service/instance-config-holder.service';
import { isPromise } from './util/isPromise';
export class NgBusyDirective {
    constructor(configHolder, instanceConfigHolder, resolver, tracker, appRef, vcr, element, renderer, injector) {
        this.configHolder = configHolder;
        this.instanceConfigHolder = instanceConfigHolder;
        this.resolver = resolver;
        this.tracker = tracker;
        this.appRef = appRef;
        this.vcr = vcr;
        this.element = element;
        this.renderer = renderer;
        this.injector = injector;
        this.busyStart = new EventEmitter();
        this.busyStop = new EventEmitter();
        this.isLoading = false;
        this.busyEmitter = new EventEmitter();
        this.onStartSubscription = tracker.onStartBusy.subscribe(() => {
            setTimeout(() => {
                this.recreateBusyIfNecessary();
                this.isLoading = true;
                this.busyEmitter.emit(this.isLoading);
                this.busyStart.emit();
            }, 0);
        });
        this.onStopSubscription = tracker.onStopBusy.subscribe(() => {
            this.isLoading = false;
            this.busyEmitter.emit(this.isLoading);
            this.busyStop.emit();
        });
    }
    set options(op) {
        this._option = op;
    }
    get options() {
        return this._option;
    }
    ngDoCheck() {
        this.optionsNorm = this.normalizeOptions(this.options);
        this.instanceConfigHolder.config = this.optionsNorm;
        this.tracker.load({
            busyList: this.optionsNorm.busy,
            delay: this.optionsNorm.delay,
            minDuration: this.optionsNorm.minDuration
        });
    }
    ngOnDestroy() {
        this.destroyComponents();
        this.onStartSubscription.unsubscribe();
        this.onStopSubscription.unsubscribe();
    }
    recreateBusyIfNecessary() {
        if (!this.busyRef
            || this.template !== this.optionsNorm.template
            || this.templateNgStyle !== this.optionsNorm.templateNgStyle) {
            this.destroyComponents();
            this.template = this.optionsNorm.template;
            this.templateNgStyle = this.optionsNorm.templateNgStyle;
            this.createBusy();
            this.busyEmitter.emit(this.isLoading);
        }
    }
    normalizeOptions(options) {
        if (!options) {
            options = { busy: [] };
        }
        else if (Array.isArray(options)
            || isPromise(options)
            || options instanceof Subscription) {
            options = { busy: options };
        }
        options = Object.assign({}, this.configHolder.config, options);
        if (!Array.isArray(options.busy)) {
            options.busy = [options.busy];
        }
        options.busy = options.busy.map(b => {
            if (b.hasOwnProperty('toPromise')) {
                console.log('observable');
                return b.toPromise();
            }
            return b;
        });
        return options;
    }
    destroyComponents() {
        if (this.busyRef) {
            this.busyRef.destroy();
        }
        if (this.componentViewRef) {
            this.appRef.detachView(this.componentViewRef);
        }
    }
    createBusy() {
        const factory = this.resolver.resolveComponentFactory(NgBusyComponent);
        const injector = Injector.create({
            providers: [
                {
                    provide: 'instanceConfigHolder',
                    useValue: this.instanceConfigHolder
                },
                {
                    provide: 'busyEmitter',
                    useValue: this.busyEmitter
                }
            ], parent: this.injector
        });
        this.template = this.optionsNorm.template;
        this.busyRef = this.vcr.createComponent(factory, 0, injector, this.generateNgContent(injector));
    }
    generateNgContent(injector) {
        if (typeof this.template === 'string') {
            const element = this.renderer.createText(this.template);
            return [[element]];
        }
        if (this.template instanceof TemplateRef) {
            const context = {};
            const viewRef = this.template.createEmbeddedView(context);
            return [viewRef.rootNodes];
        }
        const factory = this.resolver.resolveComponentFactory(this.template);
        const componentRef = factory.create(injector);
        componentRef.instance.templateNgStyle = this.options.templateNgStyle;
        this.componentViewRef = componentRef.hostView;
        this.appRef.attachView(this.componentViewRef);
        return [[componentRef.location.nativeElement]];
    }
}
NgBusyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngBusy]',
                providers: [BusyTrackerService, InstanceConfigHolderService]
            },] },
];
NgBusyDirective.ctorParameters = () => [
    { type: BusyConfigHolderService },
    { type: InstanceConfigHolderService },
    { type: ComponentFactoryResolver },
    { type: BusyTrackerService },
    { type: ApplicationRef },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector }
];
NgBusyDirective.propDecorators = {
    options: [{ type: Input, args: ['ngBusy',] }],
    busyStart: [{ type: Output }],
    busyStop: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL25nLWJ1c3kuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUFFLFFBQVEsRUFDdEIsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN2RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNN0MsTUFBTTtJQXVCSixZQUFvQixZQUFxQyxFQUMvQyxvQkFBaUQsRUFDakQsUUFBa0MsRUFDbEMsT0FBMkIsRUFDM0IsTUFBc0IsRUFDdEIsR0FBcUIsRUFDckIsT0FBbUIsRUFDbkIsUUFBbUIsRUFDbkIsUUFBa0I7UUFSUixpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDL0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE2QjtRQUNqRCxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsYUFBUSxH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O1FBQ3JFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OztZQXBKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLDJCQUEyQixDQUFDO2FBQzdEOzs7WUFWUSx1QkFBdUI7WUFJdkIsMkJBQTJCO1lBaEJsQyx3QkFBd0I7WUFXakIsa0JBQWtCO1lBWnpCLGNBQWM7WUFTZCxnQkFBZ0I7WUFOaEIsVUFBVTtZQUlWLFNBQVM7WUFISyxRQUFROzs7c0JBcUJyQixLQUFLLFNBQUMsUUFBUTt3QkFTZCxNQUFNO3VCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSwgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLCBJbmplY3RvcixcbiAgSW5wdXQsIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLCBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL2xpbmtlci92aWV3X3JlZic7XG5pbXBvcnQgeyBCdXN5VHJhY2tlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQnVzeUNvbmZpZyB9IGZyb20gJy4vbW9kZWwvYnVzeS1jb25maWcnO1xuaW1wb3J0IHsgTmdCdXN5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbmctYnVzeS9uZy1idXN5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4vdXRpbC9pc1Byb21pc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdCdXN5XScsXG4gIHByb3ZpZGVyczogW0J1c3lUcmFja2VyU2VydmljZSwgSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0J1c3lEaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ25nQnVzeScpXG4gIHNldCBvcHRpb25zKG9wKSB7XG4gICAgdGhpcy5fb3B0aW9uID0gb3A7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uO1xuICB9XG5cbiAgQE91dHB1dCgpIGJ1c3lTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJ1c3lTdG9wID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIG9wdGlvbnNOb3JtOiBJQnVzeUNvbmZpZztcbiAgcHJpdmF0ZSBidXN5UmVmOiBDb21wb25lbnRSZWY8TmdCdXN5Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBjb21wb25lbnRWaWV3UmVmOiBWaWV3UmVmO1xuICBwcml2YXRlIG9uU3RhcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBvblN0b3BTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBidXN5RW1pdHRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIHB1YmxpYyB0ZW1wbGF0ZU5nU3R5bGU6IHt9O1xuICBwcml2YXRlIF9vcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ0hvbGRlcjogQnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHRyYWNrZXI6IEJ1c3lUcmFja2VyU2VydmljZSxcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMub25TdGFydFN1YnNjcmlwdGlvbiA9IHRyYWNrZXIub25TdGFydEJ1c3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlY3JlYXRlQnVzeUlmTmVjZXNzYXJ5KCk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idXN5RW1pdHRlci5lbWl0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICAgICAgdGhpcy5idXN5U3RhcnQuZW1pdCgpO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gICAgdGhpcy5vblN0b3BTdWJzY3JpcHRpb24gPSB0cmFja2VyLm9uU3RvcEJ1c3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmJ1c3lFbWl0dGVyLmVtaXQodGhpcy5pc0xvYWRpbmcpO1xuICAgICAgdGhpcy5idXN5U3RvcC5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5vcHRpb25zTm9ybSA9IHRoaXMubm9ybWFsaXplT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuaW5zdGFuY2VDb25maWdIb2xkZXIuY29uZmlnID0gdGhpcy5vcHRpb25zTm9ybTtcbiAgICB0aGlzLnRyYWNrZXIubG9hZCh7XG4gICAgICBidXN5TGlzdDogdGhpcy5vcHRpb25zTm9ybS5idXN5LFxuICAgICAgZGVsYXk6IHRoaXMub3B0aW9uc05vcm0uZGVsYXksXG4gICAgICBtaW5EdXJhdGlvbjogdGhpcy5vcHRpb25zTm9ybS5taW5EdXJhdGlvblxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95Q29tcG9uZW50cygpO1xuICAgIHRoaXMub25TdGFydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMub25TdG9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlY3JlYXRlQnVzeUlmTmVjZXNzYXJ5KCkge1xuICAgIGlmICghdGhpcy5idXN5UmVmXG4gICAgICB8fCB0aGlzLnRlbXBsYXRlICE9PSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlXG4gICAgICB8fCB0aGlzLnRlbXBsYXRlTmdTdHlsZSAhPT0gdGhpcy5vcHRpb25zTm9ybS50ZW1wbGF0ZU5nU3R5bGVcbiAgICApIHtcbiAgICAgIHRoaXMuZGVzdHJveUNvbXBvbmVudHMoKTtcbiAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlO1xuICAgICAgdGhpcy50ZW1wbGF0ZU5nU3R5bGUgPSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlTmdTdHlsZTtcbiAgICAgIHRoaXMuY3JlYXRlQnVzeSgpO1xuICAgICAgdGhpcy5idXN5RW1pdHRlci5lbWl0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5vcm1hbGl6ZU9wdGlvbnMob3B0aW9uczogYW55KTogSUJ1c3lDb25maWcge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHsgYnVzeTogW10gfTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucylcbiAgICAgIHx8IGlzUHJvbWlzZShvcHRpb25zKVxuICAgICAgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvblxuICAgICkge1xuICAgICAgb3B0aW9ucyA9IHsgYnVzeTogb3B0aW9ucyB9O1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWdIb2xkZXIuY29uZmlnLCBvcHRpb25zKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5idXN5KSkge1xuICAgICAgb3B0aW9ucy5idXN5ID0gW29wdGlvbnMuYnVzeV07XG4gICAgfVxuXG4gICAgb3B0aW9ucy5idXN5ID0gb3B0aW9ucy5idXN5Lm1hcChiID0+IHtcbiAgICAgIGlmIChiLmhhc093blByb3BlcnR5KCd0b1Byb21pc2UnKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnb2JzZXJ2YWJsZScpO1xuICAgICAgICByZXR1cm4gYi50b1Byb21pc2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lDb21wb25lbnRzKCkge1xuICAgIGlmICh0aGlzLmJ1c3lSZWYpIHtcbiAgICAgIHRoaXMuYnVzeVJlZi5kZXN0cm95KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbXBvbmVudFZpZXdSZWYpIHtcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jb21wb25lbnRWaWV3UmVmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJ1c3koKSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdCdXN5Q29tcG9uZW50KTtcbiAgICBjb25zdCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdpbnN0YW5jZUNvbmZpZ0hvbGRlcicsXG4gICAgICAgICAgdXNlVmFsdWU6IHRoaXMuaW5zdGFuY2VDb25maWdIb2xkZXJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdidXN5RW1pdHRlcicsXG4gICAgICAgICAgdXNlVmFsdWU6IHRoaXMuYnVzeUVtaXR0ZXJcbiAgICAgICAgfVxuICAgICAgXSwgcGFyZW50OiB0aGlzLmluamVjdG9yXG4gICAgfSk7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMub3B0aW9uc05vcm0udGVtcGxhdGU7XG4gICAgdGhpcy5idXN5UmVmID0gdGhpcy52Y3IuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIGluamVjdG9yLCB0aGlzLmdlbmVyYXRlTmdDb250ZW50KGluamVjdG9yKSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlTmdDb250ZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIGlmICh0eXBlb2YgdGhpcy50ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy50ZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gW1tlbGVtZW50XV07XG4gICAgfVxuICAgIGlmICh0aGlzLnRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLnRlbXBsYXRlLmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcbiAgICAgIHJldHVybiBbdmlld1JlZi5yb290Tm9kZXNdO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnRlbXBsYXRlKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShpbmplY3Rvcik7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnRlbXBsYXRlTmdTdHlsZSA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZU5nU3R5bGU7XG4gICAgdGhpcy5jb21wb25lbnRWaWV3UmVmID0gY29tcG9uZW50UmVmLmhvc3RWaWV3O1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5jb21wb25lbnRWaWV3UmVmKTtcbiAgICByZXR1cm4gW1tjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dO1xuICB9XG5cbn1cbiJdfQ==