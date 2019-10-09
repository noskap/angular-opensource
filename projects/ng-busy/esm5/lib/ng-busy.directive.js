import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Injector, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BusyTrackerService } from './service/busy-tracker.service';
import { BusyConfigHolderService } from './service/busy-config-holder.service';
import { Subscription } from 'rxjs';
import { NgBusyComponent } from './component/ng-busy/ng-busy.component';
import { InstanceConfigHolderService } from './service/instance-config-holder.service';
import { isPromise } from './util/isPromise';
var NgBusyDirective = /** @class */ (function () {
    function NgBusyDirective(configHolder, instanceConfigHolder, resolver, tracker, appRef, vcr, element, renderer, injector) {
        var _this = this;
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
        this.onStartSubscription = tracker.onStartBusy.subscribe(function () {
            setTimeout(function () {
                _this.recreateBusyIfNecessary();
                _this.isLoading = true;
                _this.busyEmitter.emit(_this.isLoading);
                _this.busyStart.emit();
            }, 0);
        });
        this.onStopSubscription = tracker.onStopBusy.subscribe(function () {
            _this.isLoading = false;
            _this.busyEmitter.emit(_this.isLoading);
            _this.busyStop.emit();
        });
    }
    Object.defineProperty(NgBusyDirective.prototype, "options", {
        get: function () {
            return this._option;
        },
        set: function (op) {
            this._option = op;
        },
        enumerable: true,
        configurable: true
    });
    NgBusyDirective.prototype.ngDoCheck = function () {
        this.optionsNorm = this.normalizeOptions(this.options);
        this.instanceConfigHolder.config = this.optionsNorm;
        this.tracker.load({
            busyList: this.optionsNorm.busy,
            delay: this.optionsNorm.delay,
            minDuration: this.optionsNorm.minDuration
        });
    };
    NgBusyDirective.prototype.ngOnDestroy = function () {
        this.destroyComponents();
        this.onStartSubscription.unsubscribe();
        this.onStopSubscription.unsubscribe();
    };
    NgBusyDirective.prototype.recreateBusyIfNecessary = function () {
        if (!this.busyRef
            || this.template !== this.optionsNorm.template
            || this.templateNgStyle !== this.optionsNorm.templateNgStyle) {
            this.destroyComponents();
            this.template = this.optionsNorm.template;
            this.templateNgStyle = this.optionsNorm.templateNgStyle;
            this.createBusy();
            this.busyEmitter.emit(this.isLoading);
        }
    };
    NgBusyDirective.prototype.normalizeOptions = function (options) {
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
        options.busy = options.busy.map(function (b) {
            if (b.hasOwnProperty('toPromise')) {
                console.log('observable');
                return b.toPromise();
            }
            return b;
        });
        return options;
    };
    NgBusyDirective.prototype.destroyComponents = function () {
        if (this.busyRef) {
            this.busyRef.destroy();
        }
        if (this.componentViewRef) {
            this.appRef.detachView(this.componentViewRef);
        }
    };
    NgBusyDirective.prototype.createBusy = function () {
        var factory = this.resolver.resolveComponentFactory(NgBusyComponent);
        var injector = Injector.create({
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
    };
    NgBusyDirective.prototype.generateNgContent = function (injector) {
        if (typeof this.template === 'string') {
            var element = this.renderer.createText(this.template);
            return [[element]];
        }
        if (this.template instanceof TemplateRef) {
            var context = {};
            var viewRef = this.template.createEmbeddedView(context);
            return [viewRef.rootNodes];
        }
        var factory = this.resolver.resolveComponentFactory(this.template);
        var componentRef = factory.create(injector);
        componentRef.instance.templateNgStyle = this.options.templateNgStyle;
        this.componentViewRef = componentRef.hostView;
        this.appRef.attachView(this.componentViewRef);
        return [[componentRef.location.nativeElement]];
    };
    NgBusyDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngBusy]',
                    providers: [BusyTrackerService, InstanceConfigHolderService]
                },] },
    ];
    NgBusyDirective.ctorParameters = function () { return [
        { type: BusyConfigHolderService },
        { type: InstanceConfigHolderService },
        { type: ComponentFactoryResolver },
        { type: BusyTrackerService },
        { type: ApplicationRef },
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: Renderer2 },
        { type: Injector }
    ]; };
    NgBusyDirective.propDecorators = {
        options: [{ type: Input, args: ['ngBusy',] }],
        busyStart: [{ type: Output }],
        busyStop: [{ type: Output }]
    };
    return NgBusyDirective;
}());
export { NgBusyDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL25nLWJ1c3kuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUFFLFFBQVEsRUFDdEIsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN2RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFN0M7SUEyQkUseUJBQW9CLFlBQXFDLEVBQy9DLG9CQUFpRCxFQUNqRCxRQUFrQyxFQUNsQyxPQUEyQixFQUMzQixNQUFzQixFQUN0QixHQUFxQixFQUNyQixPQUFtQixFQUNuQixRQUFtQixFQUNuQixRQUFrQjtRQVI1QixpQkFzQkM7UUF0Qm1CLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUMvQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO1FBQ2pELGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztR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QUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDOztnQkFwSkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSwyQkFBMkIsQ0FBQztpQkFDN0Q7OztnQkFWUSx1QkFBdUI7Z0JBSXZCLDJCQUEyQjtnQkFoQmxDLHdCQUF3QjtnQkFXakIsa0JBQWtCO2dCQVp6QixjQUFjO2dCQVNkLGdCQUFnQjtnQkFOaEIsVUFBVTtnQkFJVixTQUFTO2dCQUhLLFFBQVE7OzswQkFxQnJCLEtBQUssU0FBQyxRQUFROzRCQVNkLE1BQU07MkJBQ04sTUFBTTs7SUF1SVQsc0JBQUM7Q0FBQSxBQXRKRCxJQXNKQztTQWxKWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IsXG4gIElucHV0LCBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZiwgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXdSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlL3NyYy9saW5rZXIvdmlld19yZWYnO1xuaW1wb3J0IHsgQnVzeVRyYWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2J1c3ktdHJhY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1c3lDb25maWdIb2xkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2J1c3ktY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSUJ1c3lDb25maWcgfSBmcm9tICcuL21vZGVsL2J1c3ktY29uZmlnJztcbmltcG9ydCB7IE5nQnVzeUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L25nLWJ1c3kvbmctYnVzeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2luc3RhbmNlLWNvbmZpZy1ob2xkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpc1Byb21pc2UgfSBmcm9tICcuL3V0aWwvaXNQcm9taXNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nQnVzeV0nLFxuICBwcm92aWRlcnM6IFtCdXN5VHJhY2tlclNlcnZpY2UsIEluc3RhbmNlQ29uZmlnSG9sZGVyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTmdCdXN5RGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgQElucHV0KCduZ0J1c3knKVxuICBzZXQgb3B0aW9ucyhvcCkge1xuICAgIHRoaXMuX29wdGlvbiA9IG9wO1xuICB9XG5cbiAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBidXN5U3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBidXN5U3RvcCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBvcHRpb25zTm9ybTogSUJ1c3lDb25maWc7XG4gIHByaXZhdGUgYnVzeVJlZjogQ29tcG9uZW50UmVmPE5nQnVzeUNvbXBvbmVudD47XG4gIHByaXZhdGUgY29tcG9uZW50Vmlld1JlZjogVmlld1JlZjtcbiAgcHJpdmF0ZSBvblN0YXJ0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgb25TdG9wU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgaXNMb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgYnVzeUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuICBwdWJsaWMgdGVtcGxhdGVOZ1N0eWxlOiB7fTtcbiAgcHJpdmF0ZSBfb3B0aW9uOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWdIb2xkZXI6IEJ1c3lDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgaW5zdGFuY2VDb25maWdIb2xkZXI6IEluc3RhbmNlQ29uZmlnSG9sZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB0cmFja2VyOiBCdXN5VHJhY2tlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLm9uU3RhcnRTdWJzY3JpcHRpb24gPSB0cmFja2VyLm9uU3RhcnRCdXN5LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWNyZWF0ZUJ1c3lJZk5lY2Vzc2FyeSgpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYnVzeUVtaXR0ZXIuZW1pdCh0aGlzLmlzTG9hZGluZyk7XG4gICAgICAgIHRoaXMuYnVzeVN0YXJ0LmVtaXQoKTtcbiAgICAgIH0sIDApO1xuICAgIH0pO1xuICAgIHRoaXMub25TdG9wU3Vic2NyaXB0aW9uID0gdHJhY2tlci5vblN0b3BCdXN5LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5idXN5RW1pdHRlci5lbWl0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICAgIHRoaXMuYnVzeVN0b3AuZW1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIHRoaXMub3B0aW9uc05vcm0gPSB0aGlzLm5vcm1hbGl6ZU9wdGlvbnModGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLmluc3RhbmNlQ29uZmlnSG9sZGVyLmNvbmZpZyA9IHRoaXMub3B0aW9uc05vcm07XG4gICAgdGhpcy50cmFja2VyLmxvYWQoe1xuICAgICAgYnVzeUxpc3Q6IHRoaXMub3B0aW9uc05vcm0uYnVzeSxcbiAgICAgIGRlbGF5OiB0aGlzLm9wdGlvbnNOb3JtLmRlbGF5LFxuICAgICAgbWluRHVyYXRpb246IHRoaXMub3B0aW9uc05vcm0ubWluRHVyYXRpb25cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveUNvbXBvbmVudHMoKTtcbiAgICB0aGlzLm9uU3RhcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLm9uU3RvcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWNyZWF0ZUJ1c3lJZk5lY2Vzc2FyeSgpIHtcbiAgICBpZiAoIXRoaXMuYnVzeVJlZlxuICAgICAgfHwgdGhpcy50ZW1wbGF0ZSAhPT0gdGhpcy5vcHRpb25zTm9ybS50ZW1wbGF0ZVxuICAgICAgfHwgdGhpcy50ZW1wbGF0ZU5nU3R5bGUgIT09IHRoaXMub3B0aW9uc05vcm0udGVtcGxhdGVOZ1N0eWxlXG4gICAgKSB7XG4gICAgICB0aGlzLmRlc3Ryb3lDb21wb25lbnRzKCk7XG4gICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy5vcHRpb25zTm9ybS50ZW1wbGF0ZTtcbiAgICAgIHRoaXMudGVtcGxhdGVOZ1N0eWxlID0gdGhpcy5vcHRpb25zTm9ybS50ZW1wbGF0ZU5nU3R5bGU7XG4gICAgICB0aGlzLmNyZWF0ZUJ1c3koKTtcbiAgICAgIHRoaXMuYnVzeUVtaXR0ZXIuZW1pdCh0aGlzLmlzTG9hZGluZyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub3JtYWxpemVPcHRpb25zKG9wdGlvbnM6IGFueSk6IElCdXN5Q29uZmlnIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7IGJ1c3k6IFtdIH07XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpXG4gICAgICB8fCBpc1Byb21pc2Uob3B0aW9ucylcbiAgICAgIHx8IG9wdGlvbnMgaW5zdGFuY2VvZiBTdWJzY3JpcHRpb25cbiAgICApIHtcbiAgICAgIG9wdGlvbnMgPSB7IGJ1c3k6IG9wdGlvbnMgfTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnSG9sZGVyLmNvbmZpZywgb3B0aW9ucyk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9wdGlvbnMuYnVzeSkpIHtcbiAgICAgIG9wdGlvbnMuYnVzeSA9IFtvcHRpb25zLmJ1c3ldO1xuICAgIH1cblxuICAgIG9wdGlvbnMuYnVzeSA9IG9wdGlvbnMuYnVzeS5tYXAoYiA9PiB7XG4gICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eSgndG9Qcm9taXNlJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29ic2VydmFibGUnKTtcbiAgICAgICAgcmV0dXJuIGIudG9Qcm9taXNlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9KTtcblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95Q29tcG9uZW50cygpIHtcbiAgICBpZiAodGhpcy5idXN5UmVmKSB7XG4gICAgICB0aGlzLmJ1c3lSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb21wb25lbnRWaWV3UmVmKSB7XG4gICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuY29tcG9uZW50Vmlld1JlZik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCdXN5KCkge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nQnVzeUNvbXBvbmVudCk7XG4gICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAnaW5zdGFuY2VDb25maWdIb2xkZXInLFxuICAgICAgICAgIHVzZVZhbHVlOiB0aGlzLmluc3RhbmNlQ29uZmlnSG9sZGVyXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAnYnVzeUVtaXR0ZXInLFxuICAgICAgICAgIHVzZVZhbHVlOiB0aGlzLmJ1c3lFbWl0dGVyXG4gICAgICAgIH1cbiAgICAgIF0sIHBhcmVudDogdGhpcy5pbmplY3RvclxuICAgIH0pO1xuICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlO1xuICAgIHRoaXMuYnVzeVJlZiA9IHRoaXMudmNyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAwLCBpbmplY3RvciwgdGhpcy5nZW5lcmF0ZU5nQ29udGVudChpbmplY3RvcikpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZU5nQ29udGVudChpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMudGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMudGVtcGxhdGUpO1xuICAgICAgcmV0dXJuIFtbZWxlbWVudF1dO1xuICAgIH1cbiAgICBpZiAodGhpcy50ZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0ge307XG4gICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy50ZW1wbGF0ZS5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCk7XG4gICAgICByZXR1cm4gW3ZpZXdSZWYucm9vdE5vZGVzXTtcbiAgICB9XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy50ZW1wbGF0ZSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gZmFjdG9yeS5jcmVhdGUoaW5qZWN0b3IpO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS50ZW1wbGF0ZU5nU3R5bGUgPSB0aGlzLm9wdGlvbnMudGVtcGxhdGVOZ1N0eWxlO1xuICAgIHRoaXMuY29tcG9uZW50Vmlld1JlZiA9IGNvbXBvbmVudFJlZi5ob3N0VmlldztcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMuY29tcG9uZW50Vmlld1JlZik7XG4gICAgcmV0dXJuIFtbY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXTtcbiAgfVxuXG59XG4iXX0=