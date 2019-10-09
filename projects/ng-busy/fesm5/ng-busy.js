import { Injectable, Optional, EventEmitter, ChangeDetectorRef, Component, Inject, NgModule, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, Injector, Input, Output, Renderer2, TemplateRef, ViewContainerRef, defineInjectable, inject } from '@angular/core';
import { __values } from 'tslib';
import { from, timer, Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

var InstanceConfigHolderService = /** @class */ (function () {
    function InstanceConfigHolderService() {
    }
    InstanceConfigHolderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    InstanceConfigHolderService.ctorParameters = function () { return []; };
    InstanceConfigHolderService.ngInjectableDef = defineInjectable({ factory: function InstanceConfigHolderService_Factory() { return new InstanceConfigHolderService(); }, token: InstanceConfigHolderService, providedIn: "root" });
    return InstanceConfigHolderService;
}());

var BusyConfig = /** @class */ (function () {
    function BusyConfig(config) {
        var e_1, _a;
        if (config === void 0) { config = {}; }
        try {
            for (var _b = __values(Object.keys(BUSY_CONFIG_DEFAULTS)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                this[option] = config[option] !== undefined ? config[option] : BUSY_CONFIG_DEFAULTS[option];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return BusyConfig;
}());
var DefaultBusyComponent = /** @class */ (function () {
    function DefaultBusyComponent(instanceConfigHolder) {
        this.instanceConfigHolder = instanceConfigHolder;
    }
    Object.defineProperty(DefaultBusyComponent.prototype, "message", {
        get: function () {
            return this.instanceConfigHolder.config.message;
        },
        enumerable: true,
        configurable: true
    });
    DefaultBusyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'default-busy',
                    template: "\n      <div class=\"ng-busy-default-wrapper\">\n          <div class=\"ng-busy-default-sign\">\n              <div class=\"ng-busy-default-spinner\">\n                  <div class=\"bar1\"></div>\n                  <div class=\"bar2\"></div>\n                  <div class=\"bar3\"></div>\n                  <div class=\"bar4\"></div>\n                  <div class=\"bar5\"></div>\n                  <div class=\"bar6\"></div>\n                  <div class=\"bar7\"></div>\n                  <div class=\"bar8\"></div>\n                  <div class=\"bar9\"></div>\n                  <div class=\"bar10\"></div>\n                  <div class=\"bar11\"></div>\n                  <div class=\"bar12\"></div>\n              </div>\n              <div class=\"ng-busy-default-text\">{{message}}</div>\n          </div>\n      </div>\n  ",
                },] },
    ];
    DefaultBusyComponent.ctorParameters = function () { return [
        { type: InstanceConfigHolderService, decorators: [{ type: Inject, args: ['instanceConfigHolder',] }] }
    ]; };
    return DefaultBusyComponent;
}());
var BUSY_CONFIG_DEFAULTS = {
    template: DefaultBusyComponent,
    templateNgStyle: {},
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy',
    disableAnimation: false
};

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}

var BusyTrackerService = /** @class */ (function () {
    function BusyTrackerService() {
        this.isDelayProcessing = false;
        this.isDurationProcessing = false;
        this.isBusiesProcessing = false;
        this.busyQueue = [];
        this.__isActive = false;
        this.onStartBusy = new EventEmitter();
        this.onStopBusy = new EventEmitter();
    }
    Object.defineProperty(BusyTrackerService.prototype, "isActive", {
        get: function () {
            return this.__isActive;
        },
        set: function (val) {
            if (this.__isActive === false && val === true && this.onStartBusy) {
                this.onStartBusy.emit();
            }
            if (this.__isActive === true && val === false && this.onStopBusy) {
                this.isBusiesProcessing = false;
                this.onStopBusy.emit();
            }
            this.__isActive = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BusyTrackerService.prototype, "busyList", {
        get: function () {
            return this.busyQueue;
        },
        enumerable: true,
        configurable: true
    });
    BusyTrackerService.prototype.load = function (options) {
        this.loadBusyQueue(options.busyList);
        this.startLoading(options);
    };
    BusyTrackerService.prototype.updateActiveStatus = function () {
        this.isActive = this.isBusiesProcessing &&
            !this.isDelayProcessing &&
            (this.isDurationProcessing || this.busyQueue.length > 0);
    };
    BusyTrackerService.prototype.startLoading = function (options) {
        var _this = this;
        if (!this.isBusiesProcessing && this.busyList.length > 0) {
            this.isBusiesProcessing = true;
            this.isDelayProcessing = true;
            this.updateActiveStatus();
            timer(options.delay).subscribe(function () {
                _this.isDelayProcessing = false;
                _this.isDurationProcessing = true;
                _this.updateActiveStatus();
                timer(options.minDuration).subscribe(function () {
                    _this.isDurationProcessing = false;
                    _this.updateActiveStatus();
                });
            });
        }
    };
    BusyTrackerService.prototype.loadBusyQueue = function (busies) {
        var _this = this;
        busies.filter(function (busy) {
            return busy && !busy.hasOwnProperty('__loaded_mark_by_ng_busy');
        }).forEach(function (busy) {
            Object.defineProperty(busy, '__loaded_mark_by_ng_busy', {
                value: true, configurable: false, enumerable: false, writable: false
            });
            var cur_busy;
            if (isPromise(busy)) {
                cur_busy = from(busy).subscribe();
            }
            else {
                cur_busy = busy;
            }
            _this.appendToQueue(cur_busy);
        });
    };
    BusyTrackerService.prototype.appendToQueue = function (busy) {
        var _this = this;
        this.busyQueue.push(busy);
        busy.add(function () {
            _this.busyQueue = _this.busyQueue.filter(function (cur) { return !cur.closed; });
            _this.updateActiveStatus();
        });
    };
    BusyTrackerService.prototype.ngOnDestroy = function () {
    };
    BusyTrackerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    BusyTrackerService.ctorParameters = function () { return []; };
    BusyTrackerService.ngInjectableDef = defineInjectable({ factory: function BusyTrackerService_Factory() { return new BusyTrackerService(); }, token: BusyTrackerService, providedIn: "root" });
    return BusyTrackerService;
}());

var BusyConfigHolderService = /** @class */ (function () {
    function BusyConfigHolderService(config) {
        this.config = Object.assign({}, BUSY_CONFIG_DEFAULTS, config || new BusyConfig());
    }
    BusyConfigHolderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    BusyConfigHolderService.ctorParameters = function () { return [
        { type: BusyConfig, decorators: [{ type: Optional }] }
    ]; };
    BusyConfigHolderService.ngInjectableDef = defineInjectable({ factory: function BusyConfigHolderService_Factory() { return new BusyConfigHolderService(inject(BusyConfig, 8)); }, token: BusyConfigHolderService, providedIn: "root" });
    return BusyConfigHolderService;
}());

var inactiveStyle = style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
var timing = '.3s ease';
var NgBusyComponent = /** @class */ (function () {
    function NgBusyComponent(instanceConfigHolder, busyEmitter, cdr) {
        var _this = this;
        this.instanceConfigHolder = instanceConfigHolder;
        this.busyEmitter = busyEmitter;
        this.cdr = cdr;
        this.disableAnimation = false;
        this.showBackdrop = true;
        this.isActive = false;
        this.busyMonitor = this.busyEmitter.subscribe(function (isActive) {
            var config = _this.instanceConfigHolder.config;
            _this.isActive = isActive;
            _this.wrapperClass = config.wrapperClass;
            _this.showBackdrop = config.backdrop;
            _this.disableAnimation = config.disableAnimation;
            if (_this.cdr) {
                _this.cdr.markForCheck();
            }
        });
    }
    NgBusyComponent.prototype.ngOnDestroy = function () {
        if (this.busyMonitor) {
            this.busyMonitor.unsubscribe();
        }
    };
    NgBusyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-ng-busy',
                    template: "<div [class]=\"wrapperClass\" @flyInOut [@.disabled]=\"disableAnimation\" *ngIf=\"isActive\">\n  <ng-content></ng-content>\n</div>\n<div class=\"ng-busy-backdrop\" @flyInOut [@.disabled]=\"disableAnimation\" *ngIf=\"showBackdrop && isActive\">\n</div>\n",
                    styles: [""],
                    animations: [
                        trigger('flyInOut', [
                            transition('void => *', [
                                inactiveStyle,
                                animate(timing)
                            ]),
                            transition('* => void', [
                                animate(timing, inactiveStyle)
                            ])
                        ])
                    ]
                },] },
    ];
    NgBusyComponent.ctorParameters = function () { return [
        { type: InstanceConfigHolderService, decorators: [{ type: Inject, args: ['instanceConfigHolder',] }] },
        { type: EventEmitter, decorators: [{ type: Inject, args: ['busyEmitter',] }] },
        { type: ChangeDetectorRef }
    ]; };
    return NgBusyComponent;
}());

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

var NgBusyModule = /** @class */ (function () {
    function NgBusyModule() {
    }
    NgBusyModule.forRoot = function (config) {
        return {
            ngModule: NgBusyModule,
            providers: [
                { provide: BusyConfig, useValue: config }
            ]
        };
    };
    NgBusyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [DefaultBusyComponent, NgBusyDirective, NgBusyComponent],
                    providers: [BusyConfigHolderService, BusyTrackerService],
                    exports: [NgBusyDirective],
                    entryComponents: [DefaultBusyComponent, NgBusyComponent]
                },] },
    ];
    return NgBusyModule;
}());

/*
 * Public API Surface of ng-busy
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgBusyComponent as ɵc, BusyConfigHolderService as ɵb, BusyTrackerService as ɵa, NgBusyDirective, InstanceConfigHolderService, NgBusyModule, BusyConfig, DefaultBusyComponent, BUSY_CONFIG_DEFAULTS };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctYnVzeS9saWIvc2VydmljZS9pbnN0YW5jZS1jb25maWctaG9sZGVyLnNlcnZpY2UudHMiLCJuZzovL25nLWJ1c3kvbGliL21vZGVsL2J1c3ktY29uZmlnLnRzIiwibmc6Ly9uZy1idXN5L2xpYi91dGlsL2lzUHJvbWlzZS50cyIsIm5nOi8vbmctYnVzeS9saWIvc2VydmljZS9idXN5LXRyYWNrZXIuc2VydmljZS50cyIsIm5nOi8vbmctYnVzeS9saWIvc2VydmljZS9idXN5LWNvbmZpZy1ob2xkZXIuc2VydmljZS50cyIsIm5nOi8vbmctYnVzeS9saWIvY29tcG9uZW50L25nLWJ1c3kvbmctYnVzeS5jb21wb25lbnQudHMiLCJuZzovL25nLWJ1c3kvbGliL25nLWJ1c3kuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1idXN5L2xpYi9uZy1idXN5Lm1vZHVsZS50cyIsIm5nOi8vbmctYnVzeS9wdWJsaWNfYXBpLnRzIiwibmc6Ly9uZy1idXN5L25nLWJ1c3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJQnVzeUNvbmZpZ30gZnJvbSAnLi4vbW9kZWwvYnVzeS1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2Uge1xuICBwdWJsaWMgY29uZmlnOiBJQnVzeUNvbmZpZztcbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Q29tcG9uZW50LCBUZW1wbGF0ZVJlZiwgVHlwZSwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0luc3RhbmNlQ29uZmlnSG9sZGVyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9pbnN0YW5jZS1jb25maWctaG9sZGVyLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgQnVzeUNvbmZpZyBpbXBsZW1lbnRzIElCdXN5Q29uZmlnIHtcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIHRlbXBsYXRlTmdTdHlsZToge307XG4gIGRlbGF5OiBudW1iZXI7XG4gIG1pbkR1cmF0aW9uOiBudW1iZXI7XG4gIGJhY2tkcm9wOiBib29sZWFuO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHdyYXBwZXJDbGFzczogc3RyaW5nO1xuICBkaXNhYmxlQW5pbWF0aW9uOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUJ1c3lDb25maWcgPSB7fSkge1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKEJVU1lfQ09ORklHX0RFRkFVTFRTKSkge1xuICAgICAgdGhpc1tvcHRpb25dID0gY29uZmlnW29wdGlvbl0gIT09IHVuZGVmaW5lZCA/IGNvbmZpZ1tvcHRpb25dIDogQlVTWV9DT05GSUdfREVGQVVMVFNbb3B0aW9uXTtcbiAgICB9XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVmYXVsdC1idXN5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJuZy1idXN5LWRlZmF1bHQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1idXN5LWRlZmF1bHQtc2lnblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmctYnVzeS1kZWZhdWx0LXNwaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIxXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyMlwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjNcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyNVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjZcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI3XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyOFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIxMFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjExXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyMTJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1idXN5LWRlZmF1bHQtdGV4dFwiPnt7bWVzc2FnZX19PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEJ1c3lDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2luc3RhbmNlQ29uZmlnSG9sZGVyJykgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlKSB7XG4gIH1cblxuICBnZXQgbWVzc2FnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZUNvbmZpZ0hvbGRlci5jb25maWcubWVzc2FnZTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCdXN5Q29uZmlnIHtcbiAgdGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuICB0ZW1wbGF0ZU5nU3R5bGU/OiB7fTtcbiAgZGVsYXk/OiBudW1iZXI7XG4gIG1pbkR1cmF0aW9uPzogbnVtYmVyO1xuICBiYWNrZHJvcD86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIHdyYXBwZXJDbGFzcz86IHN0cmluZztcbiAgYnVzeT86IEFycmF5PFByb21pc2U8YW55PiB8IFN1YnNjcmlwdGlvbj47XG4gIGRpc2FibGVBbmltYXRpb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgQlVTWV9DT05GSUdfREVGQVVMVFMgPSB7XG4gIHRlbXBsYXRlOiBEZWZhdWx0QnVzeUNvbXBvbmVudCxcbiAgdGVtcGxhdGVOZ1N0eWxlOiB7fSxcbiAgZGVsYXk6IDAsXG4gIG1pbkR1cmF0aW9uOiAwLFxuICBiYWNrZHJvcDogdHJ1ZSxcbiAgbWVzc2FnZTogJ1BsZWFzZSB3YWl0Li4uJyxcbiAgd3JhcHBlckNsYXNzOiAnbmctYnVzeScsXG4gIGRpc2FibGVBbmltYXRpb246IGZhbHNlXG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgUHJvbWlzZUxpa2U8YW55PiB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgKDxhbnk+dmFsdWUpLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgKHZhbHVlIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIGZyb20sIHRpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7aXNQcm9taXNlfSBmcm9tICcuLi91dGlsL2lzUHJvbWlzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tlck9wdGlvbnMge1xuICBtaW5EdXJhdGlvbjogbnVtYmVyO1xuICBkZWxheTogbnVtYmVyO1xuICBidXN5TGlzdDogQXJyYXk8UHJvbWlzZTxhbnk+IHwgU3Vic2NyaXB0aW9uPjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQnVzeVRyYWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGlzRGVsYXlQcm9jZXNzaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgaXNEdXJhdGlvblByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0J1c2llc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBidXN5UXVldWU6IEFycmF5PFN1YnNjcmlwdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfX2lzQWN0aXZlID0gZmFsc2U7XG5cbiAgb25TdGFydEJ1c3k6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBvblN0b3BCdXN5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19pc0FjdGl2ZTtcbiAgfVxuXG4gIHNldCBpc0FjdGl2ZSh2YWw6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fX2lzQWN0aXZlID09PSBmYWxzZSAmJiB2YWwgPT09IHRydWUgJiYgdGhpcy5vblN0YXJ0QnVzeSkge1xuICAgICAgdGhpcy5vblN0YXJ0QnVzeS5lbWl0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9faXNBY3RpdmUgPT09IHRydWUgJiYgdmFsID09PSBmYWxzZSAmJiB0aGlzLm9uU3RvcEJ1c3kpIHtcbiAgICAgIHRoaXMuaXNCdXNpZXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm9uU3RvcEJ1c3kuZW1pdCgpO1xuICAgIH1cbiAgICB0aGlzLl9faXNBY3RpdmUgPSB2YWw7XG4gIH1cbiAgZ2V0IGJ1c3lMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmJ1c3lRdWV1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBsb2FkKG9wdGlvbnM6IFRyYWNrZXJPcHRpb25zKSB7XG4gICAgdGhpcy5sb2FkQnVzeVF1ZXVlKG9wdGlvbnMuYnVzeUxpc3QpO1xuICAgIHRoaXMuc3RhcnRMb2FkaW5nKG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBY3RpdmVTdGF0dXMoKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRoaXMuaXNCdXNpZXNQcm9jZXNzaW5nICYmXG4gICAgICAhdGhpcy5pc0RlbGF5UHJvY2Vzc2luZyAmJlxuICAgICAgKHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgfHwgdGhpcy5idXN5UXVldWUubGVuZ3RoID4gMCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0TG9hZGluZyhvcHRpb25zOiBUcmFja2VyT3B0aW9ucykge1xuICAgIGlmICghdGhpcy5pc0J1c2llc1Byb2Nlc3NpbmcgJiYgdGhpcy5idXN5TGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzQnVzaWVzUHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICB0aGlzLmlzRGVsYXlQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdHVzKCk7XG4gICAgICB0aW1lcihvcHRpb25zLmRlbGF5KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzRGVsYXlQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgICAgICB0aW1lcihvcHRpb25zLm1pbkR1cmF0aW9uKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEJ1c3lRdWV1ZShidXNpZXM6IEFycmF5PFByb21pc2U8YW55PiB8IFN1YnNjcmlwdGlvbj4pIHtcbiAgICBidXNpZXMuZmlsdGVyKChidXN5KSA9PiB7XG4gICAgICByZXR1cm4gYnVzeSAmJiAhYnVzeS5oYXNPd25Qcm9wZXJ0eSgnX19sb2FkZWRfbWFya19ieV9uZ19idXN5Jyk7XG4gICAgfSkuZm9yRWFjaCgoYnVzeTogUHJvbWlzZTxhbnk+IHwgU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnVzeSwgJ19fbG9hZGVkX21hcmtfYnlfbmdfYnVzeScsIHtcbiAgICAgICAgdmFsdWU6IHRydWUsIGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgbGV0IGN1cl9idXN5O1xuICAgICAgaWYgKGlzUHJvbWlzZShidXN5KSkge1xuICAgICAgICBjdXJfYnVzeSA9IGZyb20oYnVzeSkuc3Vic2NyaWJlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJfYnVzeSA9IGJ1c3k7XG4gICAgICB9XG4gICAgICB0aGlzLmFwcGVuZFRvUXVldWUoY3VyX2J1c3kpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRUb1F1ZXVlKGJ1c3k6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuYnVzeVF1ZXVlLnB1c2goYnVzeSk7XG4gICAgYnVzeS5hZGQoKCkgPT4ge1xuICAgICAgdGhpcy5idXN5UXVldWUgPSB0aGlzLmJ1c3lRdWV1ZS5maWx0ZXIoKGN1cjogU3Vic2NyaXB0aW9uKSA9PiAhY3VyLmNsb3NlZCk7XG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCVVNZX0NPTkZJR19ERUZBVUxUUywgQnVzeUNvbmZpZ30gZnJvbSAnLi4vbW9kZWwvYnVzeS1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCdXN5Q29uZmlnSG9sZGVyU2VydmljZSB7XG4gIGNvbmZpZzogQnVzeUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBjb25maWc6IEJ1c3lDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIEJVU1lfQ09ORklHX0RFRkFVTFRTLCBjb25maWcgfHwgbmV3IEJ1c3lDb25maWcoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2FuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL2ludGVybmFsL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi4vLi4vbmctYnVzeS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcblxuY29uc3QgaW5hY3RpdmVTdHlsZSA9IHN0eWxlKHtcbiAgb3BhY2l0eTogMCxcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNDBweCknXG59KTtcbmNvbnN0IHRpbWluZyA9ICcuM3MgZWFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1idXN5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtjbGFzc109XCJ3cmFwcGVyQ2xhc3NcIiBAZmx5SW5PdXQgW0AuZGlzYWJsZWRdPVwiZGlzYWJsZUFuaW1hdGlvblwiICpuZ0lmPVwiaXNBY3RpdmVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibmctYnVzeS1iYWNrZHJvcFwiIEBmbHlJbk91dCBbQC5kaXNhYmxlZF09XCJkaXNhYmxlQW5pbWF0aW9uXCIgKm5nSWY9XCJzaG93QmFja2Ryb3AgJiYgaXNBY3RpdmVcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmx5SW5PdXQnLCBbXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgIGluYWN0aXZlU3R5bGUsXG4gICAgICAgIGFuaW1hdGUodGltaW5nKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgIGFuaW1hdGUodGltaW5nLCBpbmFjdGl2ZVN0eWxlKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQnVzeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHVibGljIHdyYXBwZXJDbGFzczogc3RyaW5nO1xuICBwdWJsaWMgZGlzYWJsZUFuaW1hdGlvbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0JhY2tkcm9wID0gdHJ1ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBidXN5TW9uaXRvcjogU3Vic2NyaXB0aW9uO1xuICBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2luc3RhbmNlQ29uZmlnSG9sZGVyJykgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ2J1c3lFbWl0dGVyJykgcHJpdmF0ZSBidXN5RW1pdHRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmJ1c3lNb25pdG9yID0gdGhpcy5idXN5RW1pdHRlci5zdWJzY3JpYmUoKGlzQWN0aXZlOiBib29sZWFuKSA9PiB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmluc3RhbmNlQ29uZmlnSG9sZGVyLmNvbmZpZztcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgIHRoaXMud3JhcHBlckNsYXNzID0gY29uZmlnLndyYXBwZXJDbGFzcztcbiAgICAgIHRoaXMuc2hvd0JhY2tkcm9wID0gY29uZmlnLmJhY2tkcm9wO1xuICAgICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9uID0gY29uZmlnLmRpc2FibGVBbmltYXRpb247XG4gICAgICBpZiAodGhpcy5jZHIpIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5idXN5TW9uaXRvcikge1xuICAgICAgdGhpcy5idXN5TW9uaXRvci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSwgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLCBJbmplY3RvcixcbiAgSW5wdXQsIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLCBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL2xpbmtlci92aWV3X3JlZic7XG5pbXBvcnQgeyBCdXN5VHJhY2tlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQnVzeUNvbmZpZyB9IGZyb20gJy4vbW9kZWwvYnVzeS1jb25maWcnO1xuaW1wb3J0IHsgTmdCdXN5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbmctYnVzeS9uZy1idXN5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4vdXRpbC9pc1Byb21pc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdCdXN5XScsXG4gIHByb3ZpZGVyczogW0J1c3lUcmFja2VyU2VydmljZSwgSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0J1c3lEaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ25nQnVzeScpXG4gIHNldCBvcHRpb25zKG9wKSB7XG4gICAgdGhpcy5fb3B0aW9uID0gb3A7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uO1xuICB9XG5cbiAgQE91dHB1dCgpIGJ1c3lTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJ1c3lTdG9wID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIG9wdGlvbnNOb3JtOiBJQnVzeUNvbmZpZztcbiAgcHJpdmF0ZSBidXN5UmVmOiBDb21wb25lbnRSZWY8TmdCdXN5Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBjb21wb25lbnRWaWV3UmVmOiBWaWV3UmVmO1xuICBwcml2YXRlIG9uU3RhcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBvblN0b3BTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBidXN5RW1pdHRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIHB1YmxpYyB0ZW1wbGF0ZU5nU3R5bGU6IHt9O1xuICBwcml2YXRlIF9vcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ0hvbGRlcjogQnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHRyYWNrZXI6IEJ1c3lUcmFja2VyU2VydmljZSxcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMub25TdGFydFN1YnNjcmlwdGlvbiA9IHRyYWNrZXIub25TdGFydEJ1c3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlY3JlYXRlQnVzeUlmTmVjZXNzYXJ5KCk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idXN5RW1pdHRlci5lbWl0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICAgICAgdGhpcy5idXN5U3RhcnQuZW1pdCgpO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gICAgdGhpcy5vblN0b3BTdWJzY3JpcHRpb24gPSB0cmFja2VyLm9uU3RvcEJ1c3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmJ1c3lFbWl0dGVyLmVtaXQodGhpcy5pc0xvYWRpbmcpO1xuICAgICAgdGhpcy5idXN5U3RvcC5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5vcHRpb25zTm9ybSA9IHRoaXMubm9ybWFsaXplT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuaW5zdGFuY2VDb25maWdIb2xkZXIuY29uZmlnID0gdGhpcy5vcHRpb25zTm9ybTtcbiAgICB0aGlzLnRyYWNrZXIubG9hZCh7XG4gICAgICBidXN5TGlzdDogdGhpcy5vcHRpb25zTm9ybS5idXN5LFxuICAgICAgZGVsYXk6IHRoaXMub3B0aW9uc05vcm0uZGVsYXksXG4gICAgICBtaW5EdXJhdGlvbjogdGhpcy5vcHRpb25zTm9ybS5taW5EdXJhdGlvblxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95Q29tcG9uZW50cygpO1xuICAgIHRoaXMub25TdGFydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMub25TdG9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlY3JlYXRlQnVzeUlmTmVjZXNzYXJ5KCkge1xuICAgIGlmICghdGhpcy5idXN5UmVmXG4gICAgICB8fCB0aGlzLnRlbXBsYXRlICE9PSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlXG4gICAgICB8fCB0aGlzLnRlbXBsYXRlTmdTdHlsZSAhPT0gdGhpcy5vcHRpb25zTm9ybS50ZW1wbGF0ZU5nU3R5bGVcbiAgICApIHtcbiAgICAgIHRoaXMuZGVzdHJveUNvbXBvbmVudHMoKTtcbiAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlO1xuICAgICAgdGhpcy50ZW1wbGF0ZU5nU3R5bGUgPSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlTmdTdHlsZTtcbiAgICAgIHRoaXMuY3JlYXRlQnVzeSgpO1xuICAgICAgdGhpcy5idXN5RW1pdHRlci5lbWl0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5vcm1hbGl6ZU9wdGlvbnMob3B0aW9uczogYW55KTogSUJ1c3lDb25maWcge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHsgYnVzeTogW10gfTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucylcbiAgICAgIHx8IGlzUHJvbWlzZShvcHRpb25zKVxuICAgICAgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvblxuICAgICkge1xuICAgICAgb3B0aW9ucyA9IHsgYnVzeTogb3B0aW9ucyB9O1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWdIb2xkZXIuY29uZmlnLCBvcHRpb25zKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5idXN5KSkge1xuICAgICAgb3B0aW9ucy5idXN5ID0gW29wdGlvbnMuYnVzeV07XG4gICAgfVxuXG4gICAgb3B0aW9ucy5idXN5ID0gb3B0aW9ucy5idXN5Lm1hcChiID0+IHtcbiAgICAgIGlmIChiLmhhc093blByb3BlcnR5KCd0b1Byb21pc2UnKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnb2JzZXJ2YWJsZScpO1xuICAgICAgICByZXR1cm4gYi50b1Byb21pc2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lDb21wb25lbnRzKCkge1xuICAgIGlmICh0aGlzLmJ1c3lSZWYpIHtcbiAgICAgIHRoaXMuYnVzeVJlZi5kZXN0cm95KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbXBvbmVudFZpZXdSZWYpIHtcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jb21wb25lbnRWaWV3UmVmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJ1c3koKSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdCdXN5Q29tcG9uZW50KTtcbiAgICBjb25zdCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdpbnN0YW5jZUNvbmZpZ0hvbGRlcicsXG4gICAgICAgICAgdXNlVmFsdWU6IHRoaXMuaW5zdGFuY2VDb25maWdIb2xkZXJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdidXN5RW1pdHRlcicsXG4gICAgICAgICAgdXNlVmFsdWU6IHRoaXMuYnVzeUVtaXR0ZXJcbiAgICAgICAgfVxuICAgICAgXSwgcGFyZW50OiB0aGlzLmluamVjdG9yXG4gICAgfSk7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMub3B0aW9uc05vcm0udGVtcGxhdGU7XG4gICAgdGhpcy5idXN5UmVmID0gdGhpcy52Y3IuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIGluamVjdG9yLCB0aGlzLmdlbmVyYXRlTmdDb250ZW50KGluamVjdG9yKSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlTmdDb250ZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIGlmICh0eXBlb2YgdGhpcy50ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy50ZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gW1tlbGVtZW50XV07XG4gICAgfVxuICAgIGlmICh0aGlzLnRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLnRlbXBsYXRlLmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcbiAgICAgIHJldHVybiBbdmlld1JlZi5yb290Tm9kZXNdO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnRlbXBsYXRlKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShpbmplY3Rvcik7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnRlbXBsYXRlTmdTdHlsZSA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZU5nU3R5bGU7XG4gICAgdGhpcy5jb21wb25lbnRWaWV3UmVmID0gY29tcG9uZW50UmVmLmhvc3RWaWV3O1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5jb21wb25lbnRWaWV3UmVmKTtcbiAgICByZXR1cm4gW1tjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dO1xuICB9XG5cbn1cbiIsImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCdXN5Q29uZmlnLCBEZWZhdWx0QnVzeUNvbXBvbmVudCwgSUJ1c3lDb25maWd9IGZyb20gJy4vbW9kZWwvYnVzeS1jb25maWcnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1c3lUcmFja2VyU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL2J1c3ktdHJhY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7QnVzeUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9idXN5LWNvbmZpZy1ob2xkZXIuc2VydmljZSc7XG5pbXBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi9uZy1idXN5LmRpcmVjdGl2ZSc7XG5pbXBvcnQge05nQnVzeUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbmctYnVzeS9uZy1idXN5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWZhdWx0QnVzeUNvbXBvbmVudCwgTmdCdXN5RGlyZWN0aXZlLCBOZ0J1c3lDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtCdXN5Q29uZmlnSG9sZGVyU2VydmljZSwgQnVzeVRyYWNrZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW05nQnVzeURpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlZmF1bHRCdXN5Q29tcG9uZW50LCBOZ0J1c3lDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nQnVzeU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogSUJ1c3lDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nQnVzeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQnVzeUNvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIG5nLWJ1c3lcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9uZy1idXN5Lm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9idXN5LWNvbmZpZyc7XG5leHBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi9saWIvbmctYnVzeS5kaXJlY3RpdmUnO1xuZXhwb3J0IHtJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4vbGliL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtOZ0J1c3lDb21wb25lbnQgYXMgw4nCtWN9IGZyb20gJy4vbGliL2NvbXBvbmVudC9uZy1idXN5L25nLWJ1c3kuY29tcG9uZW50JztcbmV4cG9ydCB7QnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UgYXMgw4nCtWJ9IGZyb20gJy4vbGliL3NlcnZpY2UvYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UnO1xuZXhwb3J0IHtCdXN5VHJhY2tlclNlcnZpY2UgYXMgw4nCtWF9IGZyb20gJy4vbGliL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UnOyJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBUUU7S0FBaUI7O2dCQUxsQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O3NDQUxEO0NBU0M7OztJQ0tDLG9CQUFZLE1BQXdCOztRQUF4Qix1QkFBQSxFQUFBLFdBQXdCOztZQUNsQyxLQUFxQixJQUFBLEtBQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO2dCQUFuRCxJQUFNLE1BQU0sV0FBQTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0Y7Ozs7Ozs7OztLQUNGO0lBQ0gsaUJBQUM7Q0FBQSxJQUFBOztJQTRCQyw4QkFBb0Qsb0JBQWlEO1FBQWpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7S0FDcEc7SUFFRCxzQkFBSSx5Q0FBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNqRDs7O09BQUE7O2dCQS9CRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxrMEJBb0JUO2lCQUNGOzs7Z0JBMUNPLDJCQUEyQix1QkE2Q3BCLE1BQU0sU0FBQyxzQkFBc0I7O0lBTTVDLDJCQUFDO0NBQUEsSUFBQTtJQWNZLG9CQUFvQixHQUFHO0lBQ2xDLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsZUFBZSxFQUFFLEVBQUU7SUFDbkIsS0FBSyxFQUFFLENBQUM7SUFDUixXQUFXLEVBQUUsQ0FBQztJQUNkLFFBQVEsRUFBRSxJQUFJO0lBQ2QsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixZQUFZLEVBQUUsU0FBUztJQUN2QixnQkFBZ0IsRUFBRSxLQUFLO0NBQ3hCOzttQkM1RXlCLEtBQVU7SUFDbEMsT0FBTyxLQUFLLElBQUksT0FBYSxLQUFNLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxPQUFRLEtBQWEsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0NBQzNHOzs7SUN3Q0M7UUEzQlEsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3Qix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUF3QixFQUFFLENBQUM7UUFDcEMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQW9CbkM7SUFsQmhCLHNCQUFJLHdDQUFRO2FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7YUFFRCxVQUFhLEdBQVk7WUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDekI7WUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1NBQ3ZCOzs7T0FYQTtJQVlELHNCQUFJLHdDQUFRO2FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7OztPQUFBO0lBSUQsaUNBQUksR0FBSixVQUFLLE9BQXVCO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUI7SUFFTywrQ0FBa0IsR0FBMUI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0I7WUFDckMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCO2FBQ3RCLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM1RDtJQUVPLHlDQUFZLEdBQXBCLFVBQXFCLE9BQXVCO1FBQTVDLGlCQWVDO1FBZEMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUM3QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixLQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO2dCQUNqQyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ25DLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7b0JBQ2xDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUMzQixDQUFDLENBQUM7YUFDSixDQUFDLENBQUM7U0FDSjtLQUNGO0lBRU8sMENBQWEsR0FBckIsVUFBc0IsTUFBMEM7UUFBaEUsaUJBZUM7UUFkQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSTtZQUNqQixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUNqRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBaUM7WUFDM0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7Z0JBQ3RELEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLO2FBQ3JFLENBQUMsQ0FBQztZQUNILElBQUksUUFBUSxDQUFDO1lBQ2IsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbkM7aUJBQU07Z0JBQ0wsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNqQjtZQUNELEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0tBQ0o7SUFFTywwQ0FBYSxHQUFyQixVQUFzQixJQUFrQjtRQUF4QyxpQkFNQztRQUxDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBaUIsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQSxDQUFDLENBQUM7WUFDM0UsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0IsQ0FBQyxDQUFDO0tBQ0o7SUFFRCx3Q0FBVyxHQUFYO0tBQ0M7O2dCQXhGRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OzZCQVpEO0NBbUdDOzs7SUMxRkMsaUNBQXdCLE1BQWtCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxJQUFJLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQztLQUNuRjs7Z0JBUkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2dCQUo2QixVQUFVLHVCQVF6QixRQUFROzs7a0NBVHZCO0NBWUM7O0FDTkQsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzFCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsU0FBUyxFQUFFLG1CQUFtQjtDQUMvQixDQUFDLENBQUM7QUFDSCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFFMUI7SUE2QkUseUJBQzBDLG9CQUFpRCxFQUMxRCxXQUFrQyxFQUNoRCxHQUFzQjtRQUh6QyxpQkFlQztRQWR5Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO1FBQzFELGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUNoRCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVJsQyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFM0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU9mLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxRQUFpQjtZQUM5RCxJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQ2hELEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN4QyxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRCxJQUFJLEtBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6QjtTQUNGLENBQUMsQ0FBQztLQUNKO0lBRUQscUNBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2hDO0tBQ0Y7O2dCQWxERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwrUEFLWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxVQUFVLEVBQUU7NEJBQ2xCLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0NBQ3RCLGFBQWE7Z0NBQ2IsT0FBTyxDQUFDLE1BQU0sQ0FBQzs2QkFDaEIsQ0FBQzs0QkFDRixVQUFVLENBQUMsV0FBVyxFQUFFO2dDQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQzs2QkFDL0IsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGOzs7Z0JBNUJPLDJCQUEyQix1QkFzQzlCLE1BQU0sU0FBQyxzQkFBc0I7Z0JBMUNJLFlBQVksdUJBMkM3QyxNQUFNLFNBQUMsYUFBYTtnQkEzQ2pCLGlCQUFpQjs7SUFnRXpCLHNCQUFDO0NBQUE7OztJQ2hCQyx5QkFBb0IsWUFBcUMsRUFDL0Msb0JBQWlELEVBQ2pELFFBQWtDLEVBQ2xDLE9BQTJCLEVBQzNCLE1BQXNCLEVBQ3RCLEdBQXFCLEVBQ3JCLE9BQW1CLEVBQ25CLFFBQW1CLEVBQ25CLFFBQWtCO1FBUjVCLGlCQXNCQztRQXRCbUIsaUJBQVksR0FBWixZQUFZLENBQXlCO1FBQy9DLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFDakQsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFyQmxCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9CLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTWhDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZ0JBQVcsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQWN2RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDdkQsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2dCQUMvQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDckQsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0tBQ0o7SUE1Q0Qsc0JBQ0ksb0NBQU87YUFJWDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQjthQVBELFVBQ1ksRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ25COzs7T0FBQTtJQTJDRCxtQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDN0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVztTQUMxQyxDQUFDLENBQUM7S0FDSjtJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3ZDO0lBRU8saURBQXVCLEdBQS9CO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2VBQ1osSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7ZUFDM0MsSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFDNUQ7WUFDQSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7WUFDeEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN2QztLQUNGO0lBRU8sMENBQWdCLEdBQXhCLFVBQXlCLE9BQVk7UUFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUN4QjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7ZUFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBQztlQUNsQixPQUFPLFlBQVksWUFBWSxFQUNsQztZQUNBLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztTQUM3QjtRQUNELE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQy9CLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdEI7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNWLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBRU8sMkNBQWlCLEdBQXpCO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMvQztLQUNGO0lBRU8sb0NBQVUsR0FBbEI7UUFDRSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZFLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDL0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxzQkFBc0I7b0JBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CO2lCQUNwQztnQkFDRDtvQkFDRSxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUMzQjthQUNGLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUNqRztJQUVPLDJDQUFpQixHQUF6QixVQUEwQixRQUFrQjtRQUMxQyxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDckMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDcEI7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksV0FBVyxFQUFFO1lBQ3hDLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztLQUNoRDs7Z0JBcEpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsMkJBQTJCLENBQUM7aUJBQzdEOzs7Z0JBVlEsdUJBQXVCO2dCQUl2QiwyQkFBMkI7Z0JBaEJsQyx3QkFBd0I7Z0JBV2pCLGtCQUFrQjtnQkFaekIsY0FBYztnQkFTZCxnQkFBZ0I7Z0JBTmhCLFVBQVU7Z0JBSVYsU0FBUztnQkFISyxRQUFROzs7MEJBcUJyQixLQUFLLFNBQUMsUUFBUTs0QkFTZCxNQUFNOzJCQUNOLE1BQU07O0lBdUlULHNCQUFDO0NBQUE7OztJQ25LRDtLQWdCQztJQVJRLG9CQUFPLEdBQWQsVUFBZSxNQUFtQjtRQUNoQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2FBQ3hDO1NBQ0YsQ0FBQztLQUNIOztnQkFmRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUN0RSxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxrQkFBa0IsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUM7aUJBQ3pEOztJQVVELG1CQUFDO0NBQUE7O0FDeEJEOztHQUVHOztBQ0ZIOztHQUVHOzs7OyJ9