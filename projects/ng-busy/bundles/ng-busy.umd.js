(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-busy', ['exports', '@angular/core', 'rxjs', '@angular/animations', '@angular/common'], factory) :
    (factory((global['ng-busy'] = {}),global.ng.core,global.rxjs,global.ng.animations,global.ng.common));
}(this, (function (exports,i0,rxjs,animations,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    var InstanceConfigHolderService = /** @class */ (function () {
        function InstanceConfigHolderService() {
        }
        InstanceConfigHolderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        InstanceConfigHolderService.ctorParameters = function () { return []; };
        InstanceConfigHolderService.ngInjectableDef = i0.defineInjectable({ factory: function InstanceConfigHolderService_Factory() { return new InstanceConfigHolderService(); }, token: InstanceConfigHolderService, providedIn: "root" });
        return InstanceConfigHolderService;
    }());

    var BusyConfig = /** @class */ (function () {
        function BusyConfig(config) {
            var e_1, _a;
            if (config === void 0) {
                config = {};
            }
            try {
                for (var _b = __values(Object.keys(BUSY_CONFIG_DEFAULTS)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    this[option] = config[option] !== undefined ? config[option] : BUSY_CONFIG_DEFAULTS[option];
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
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
            { type: i0.Component, args: [{
                        selector: 'default-busy',
                        template: "\n      <div class=\"ng-busy-default-wrapper\">\n          <div class=\"ng-busy-default-sign\">\n              <div class=\"ng-busy-default-spinner\">\n                  <div class=\"bar1\"></div>\n                  <div class=\"bar2\"></div>\n                  <div class=\"bar3\"></div>\n                  <div class=\"bar4\"></div>\n                  <div class=\"bar5\"></div>\n                  <div class=\"bar6\"></div>\n                  <div class=\"bar7\"></div>\n                  <div class=\"bar8\"></div>\n                  <div class=\"bar9\"></div>\n                  <div class=\"bar10\"></div>\n                  <div class=\"bar11\"></div>\n                  <div class=\"bar12\"></div>\n              </div>\n              <div class=\"ng-busy-default-text\">{{message}}</div>\n          </div>\n      </div>\n  ",
                    },] },
        ];
        DefaultBusyComponent.ctorParameters = function () {
            return [
                { type: InstanceConfigHolderService, decorators: [{ type: i0.Inject, args: ['instanceConfigHolder',] }] }
            ];
        };
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
            this.onStartBusy = new i0.EventEmitter();
            this.onStopBusy = new i0.EventEmitter();
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
                rxjs.timer(options.delay).subscribe(function () {
                    _this.isDelayProcessing = false;
                    _this.isDurationProcessing = true;
                    _this.updateActiveStatus();
                    rxjs.timer(options.minDuration).subscribe(function () {
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
                    cur_busy = rxjs.from(busy).subscribe();
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        BusyTrackerService.ctorParameters = function () { return []; };
        BusyTrackerService.ngInjectableDef = i0.defineInjectable({ factory: function BusyTrackerService_Factory() { return new BusyTrackerService(); }, token: BusyTrackerService, providedIn: "root" });
        return BusyTrackerService;
    }());

    var BusyConfigHolderService = /** @class */ (function () {
        function BusyConfigHolderService(config) {
            this.config = Object.assign({}, BUSY_CONFIG_DEFAULTS, config || new BusyConfig());
        }
        BusyConfigHolderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        BusyConfigHolderService.ctorParameters = function () {
            return [
                { type: BusyConfig, decorators: [{ type: i0.Optional }] }
            ];
        };
        BusyConfigHolderService.ngInjectableDef = i0.defineInjectable({ factory: function BusyConfigHolderService_Factory() { return new BusyConfigHolderService(i0.inject(BusyConfig, 8)); }, token: BusyConfigHolderService, providedIn: "root" });
        return BusyConfigHolderService;
    }());

    var inactiveStyle = animations.style({
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
            { type: i0.Component, args: [{
                        selector: 'lib-ng-busy',
                        template: "<div [class]=\"wrapperClass\" @flyInOut [@.disabled]=\"disableAnimation\" *ngIf=\"isActive\">\n  <ng-content></ng-content>\n</div>\n<div class=\"ng-busy-backdrop\" @flyInOut [@.disabled]=\"disableAnimation\" *ngIf=\"showBackdrop && isActive\">\n</div>\n",
                        styles: [""],
                        animations: [
                            animations.trigger('flyInOut', [
                                animations.transition('void => *', [
                                    inactiveStyle,
                                    animations.animate(timing)
                                ]),
                                animations.transition('* => void', [
                                    animations.animate(timing, inactiveStyle)
                                ])
                            ])
                        ]
                    },] },
        ];
        NgBusyComponent.ctorParameters = function () {
            return [
                { type: InstanceConfigHolderService, decorators: [{ type: i0.Inject, args: ['instanceConfigHolder',] }] },
                { type: i0.EventEmitter, decorators: [{ type: i0.Inject, args: ['busyEmitter',] }] },
                { type: i0.ChangeDetectorRef }
            ];
        };
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
            this.busyStart = new i0.EventEmitter();
            this.busyStop = new i0.EventEmitter();
            this.isLoading = false;
            this.busyEmitter = new i0.EventEmitter();
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
                || options instanceof rxjs.Subscription) {
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
            var injector = i0.Injector.create({
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
            if (this.template instanceof i0.TemplateRef) {
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
            { type: i0.Directive, args: [{
                        selector: '[ngBusy]',
                        providers: [BusyTrackerService, InstanceConfigHolderService]
                    },] },
        ];
        NgBusyDirective.ctorParameters = function () {
            return [
                { type: BusyConfigHolderService },
                { type: InstanceConfigHolderService },
                { type: i0.ComponentFactoryResolver },
                { type: BusyTrackerService },
                { type: i0.ApplicationRef },
                { type: i0.ViewContainerRef },
                { type: i0.ElementRef },
                { type: i0.Renderer2 },
                { type: i0.Injector }
            ];
        };
        NgBusyDirective.propDecorators = {
            options: [{ type: i0.Input, args: ['ngBusy',] }],
            busyStart: [{ type: i0.Output }],
            busyStop: [{ type: i0.Output }]
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
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule],
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

    exports.ɵc = NgBusyComponent;
    exports.ɵb = BusyConfigHolderService;
    exports.ɵa = BusyTrackerService;
    exports.NgBusyDirective = NgBusyDirective;
    exports.InstanceConfigHolderService = InstanceConfigHolderService;
    exports.NgBusyModule = NgBusyModule;
    exports.BusyConfig = BusyConfig;
    exports.DefaultBusyComponent = DefaultBusyComponent;
    exports.BUSY_CONFIG_DEFAULTS = BUSY_CONFIG_DEFAULTS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vbmctYnVzeS9saWIvc2VydmljZS9pbnN0YW5jZS1jb25maWctaG9sZGVyLnNlcnZpY2UudHMiLCJuZzovL25nLWJ1c3kvbGliL21vZGVsL2J1c3ktY29uZmlnLnRzIiwibmc6Ly9uZy1idXN5L2xpYi91dGlsL2lzUHJvbWlzZS50cyIsIm5nOi8vbmctYnVzeS9saWIvc2VydmljZS9idXN5LXRyYWNrZXIuc2VydmljZS50cyIsIm5nOi8vbmctYnVzeS9saWIvc2VydmljZS9idXN5LWNvbmZpZy1ob2xkZXIuc2VydmljZS50cyIsIm5nOi8vbmctYnVzeS9saWIvY29tcG9uZW50L25nLWJ1c3kvbmctYnVzeS5jb21wb25lbnQudHMiLCJuZzovL25nLWJ1c3kvbGliL25nLWJ1c3kuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1idXN5L2xpYi9uZy1idXN5Lm1vZHVsZS50cyIsIm5nOi8vbmctYnVzeS9wdWJsaWNfYXBpLnRzIiwibmc6Ly9uZy1idXN5L25nLWJ1c3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJQnVzeUNvbmZpZ30gZnJvbSAnLi4vbW9kZWwvYnVzeS1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2Uge1xuICBwdWJsaWMgY29uZmlnOiBJQnVzeUNvbmZpZztcbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Q29tcG9uZW50LCBUZW1wbGF0ZVJlZiwgVHlwZSwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0luc3RhbmNlQ29uZmlnSG9sZGVyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9pbnN0YW5jZS1jb25maWctaG9sZGVyLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgQnVzeUNvbmZpZyBpbXBsZW1lbnRzIElCdXN5Q29uZmlnIHtcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIHRlbXBsYXRlTmdTdHlsZToge307XG4gIGRlbGF5OiBudW1iZXI7XG4gIG1pbkR1cmF0aW9uOiBudW1iZXI7XG4gIGJhY2tkcm9wOiBib29sZWFuO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHdyYXBwZXJDbGFzczogc3RyaW5nO1xuICBkaXNhYmxlQW5pbWF0aW9uOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUJ1c3lDb25maWcgPSB7fSkge1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKEJVU1lfQ09ORklHX0RFRkFVTFRTKSkge1xuICAgICAgdGhpc1tvcHRpb25dID0gY29uZmlnW29wdGlvbl0gIT09IHVuZGVmaW5lZCA/IGNvbmZpZ1tvcHRpb25dIDogQlVTWV9DT05GSUdfREVGQVVMVFNbb3B0aW9uXTtcbiAgICB9XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVmYXVsdC1idXN5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJuZy1idXN5LWRlZmF1bHQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1idXN5LWRlZmF1bHQtc2lnblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmctYnVzeS1kZWZhdWx0LXNwaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIxXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyMlwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjNcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyNVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjZcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI3XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyOFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIxMFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjExXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyMTJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1idXN5LWRlZmF1bHQtdGV4dFwiPnt7bWVzc2FnZX19PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEJ1c3lDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2luc3RhbmNlQ29uZmlnSG9sZGVyJykgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlKSB7XG4gIH1cblxuICBnZXQgbWVzc2FnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZUNvbmZpZ0hvbGRlci5jb25maWcubWVzc2FnZTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCdXN5Q29uZmlnIHtcbiAgdGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuICB0ZW1wbGF0ZU5nU3R5bGU/OiB7fTtcbiAgZGVsYXk/OiBudW1iZXI7XG4gIG1pbkR1cmF0aW9uPzogbnVtYmVyO1xuICBiYWNrZHJvcD86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIHdyYXBwZXJDbGFzcz86IHN0cmluZztcbiAgYnVzeT86IEFycmF5PFByb21pc2U8YW55PiB8IFN1YnNjcmlwdGlvbj47XG4gIGRpc2FibGVBbmltYXRpb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgQlVTWV9DT05GSUdfREVGQVVMVFMgPSB7XG4gIHRlbXBsYXRlOiBEZWZhdWx0QnVzeUNvbXBvbmVudCxcbiAgdGVtcGxhdGVOZ1N0eWxlOiB7fSxcbiAgZGVsYXk6IDAsXG4gIG1pbkR1cmF0aW9uOiAwLFxuICBiYWNrZHJvcDogdHJ1ZSxcbiAgbWVzc2FnZTogJ1BsZWFzZSB3YWl0Li4uJyxcbiAgd3JhcHBlckNsYXNzOiAnbmctYnVzeScsXG4gIGRpc2FibGVBbmltYXRpb246IGZhbHNlXG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgUHJvbWlzZUxpa2U8YW55PiB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgKDxhbnk+dmFsdWUpLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgKHZhbHVlIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIGZyb20sIHRpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7aXNQcm9taXNlfSBmcm9tICcuLi91dGlsL2lzUHJvbWlzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tlck9wdGlvbnMge1xuICBtaW5EdXJhdGlvbjogbnVtYmVyO1xuICBkZWxheTogbnVtYmVyO1xuICBidXN5TGlzdDogQXJyYXk8UHJvbWlzZTxhbnk+IHwgU3Vic2NyaXB0aW9uPjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQnVzeVRyYWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGlzRGVsYXlQcm9jZXNzaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgaXNEdXJhdGlvblByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0J1c2llc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBidXN5UXVldWU6IEFycmF5PFN1YnNjcmlwdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfX2lzQWN0aXZlID0gZmFsc2U7XG5cbiAgb25TdGFydEJ1c3k6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBvblN0b3BCdXN5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19pc0FjdGl2ZTtcbiAgfVxuXG4gIHNldCBpc0FjdGl2ZSh2YWw6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fX2lzQWN0aXZlID09PSBmYWxzZSAmJiB2YWwgPT09IHRydWUgJiYgdGhpcy5vblN0YXJ0QnVzeSkge1xuICAgICAgdGhpcy5vblN0YXJ0QnVzeS5lbWl0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9faXNBY3RpdmUgPT09IHRydWUgJiYgdmFsID09PSBmYWxzZSAmJiB0aGlzLm9uU3RvcEJ1c3kpIHtcbiAgICAgIHRoaXMuaXNCdXNpZXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm9uU3RvcEJ1c3kuZW1pdCgpO1xuICAgIH1cbiAgICB0aGlzLl9faXNBY3RpdmUgPSB2YWw7XG4gIH1cbiAgZ2V0IGJ1c3lMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmJ1c3lRdWV1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBsb2FkKG9wdGlvbnM6IFRyYWNrZXJPcHRpb25zKSB7XG4gICAgdGhpcy5sb2FkQnVzeVF1ZXVlKG9wdGlvbnMuYnVzeUxpc3QpO1xuICAgIHRoaXMuc3RhcnRMb2FkaW5nKG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBY3RpdmVTdGF0dXMoKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRoaXMuaXNCdXNpZXNQcm9jZXNzaW5nICYmXG4gICAgICAhdGhpcy5pc0RlbGF5UHJvY2Vzc2luZyAmJlxuICAgICAgKHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgfHwgdGhpcy5idXN5UXVldWUubGVuZ3RoID4gMCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0TG9hZGluZyhvcHRpb25zOiBUcmFja2VyT3B0aW9ucykge1xuICAgIGlmICghdGhpcy5pc0J1c2llc1Byb2Nlc3NpbmcgJiYgdGhpcy5idXN5TGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzQnVzaWVzUHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICB0aGlzLmlzRGVsYXlQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdHVzKCk7XG4gICAgICB0aW1lcihvcHRpb25zLmRlbGF5KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzRGVsYXlQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgICAgICB0aW1lcihvcHRpb25zLm1pbkR1cmF0aW9uKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEJ1c3lRdWV1ZShidXNpZXM6IEFycmF5PFByb21pc2U8YW55PiB8IFN1YnNjcmlwdGlvbj4pIHtcbiAgICBidXNpZXMuZmlsdGVyKChidXN5KSA9PiB7XG4gICAgICByZXR1cm4gYnVzeSAmJiAhYnVzeS5oYXNPd25Qcm9wZXJ0eSgnX19sb2FkZWRfbWFya19ieV9uZ19idXN5Jyk7XG4gICAgfSkuZm9yRWFjaCgoYnVzeTogUHJvbWlzZTxhbnk+IHwgU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnVzeSwgJ19fbG9hZGVkX21hcmtfYnlfbmdfYnVzeScsIHtcbiAgICAgICAgdmFsdWU6IHRydWUsIGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgbGV0IGN1cl9idXN5O1xuICAgICAgaWYgKGlzUHJvbWlzZShidXN5KSkge1xuICAgICAgICBjdXJfYnVzeSA9IGZyb20oYnVzeSkuc3Vic2NyaWJlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJfYnVzeSA9IGJ1c3k7XG4gICAgICB9XG4gICAgICB0aGlzLmFwcGVuZFRvUXVldWUoY3VyX2J1c3kpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRUb1F1ZXVlKGJ1c3k6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuYnVzeVF1ZXVlLnB1c2goYnVzeSk7XG4gICAgYnVzeS5hZGQoKCkgPT4ge1xuICAgICAgdGhpcy5idXN5UXVldWUgPSB0aGlzLmJ1c3lRdWV1ZS5maWx0ZXIoKGN1cjogU3Vic2NyaXB0aW9uKSA9PiAhY3VyLmNsb3NlZCk7XG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCVVNZX0NPTkZJR19ERUZBVUxUUywgQnVzeUNvbmZpZ30gZnJvbSAnLi4vbW9kZWwvYnVzeS1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCdXN5Q29uZmlnSG9sZGVyU2VydmljZSB7XG4gIGNvbmZpZzogQnVzeUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBjb25maWc6IEJ1c3lDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIEJVU1lfQ09ORklHX0RFRkFVTFRTLCBjb25maWcgfHwgbmV3IEJ1c3lDb25maWcoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2FuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL2ludGVybmFsL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi4vLi4vbmctYnVzeS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcblxuY29uc3QgaW5hY3RpdmVTdHlsZSA9IHN0eWxlKHtcbiAgb3BhY2l0eTogMCxcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNDBweCknXG59KTtcbmNvbnN0IHRpbWluZyA9ICcuM3MgZWFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1idXN5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtjbGFzc109XCJ3cmFwcGVyQ2xhc3NcIiBAZmx5SW5PdXQgW0AuZGlzYWJsZWRdPVwiZGlzYWJsZUFuaW1hdGlvblwiICpuZ0lmPVwiaXNBY3RpdmVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibmctYnVzeS1iYWNrZHJvcFwiIEBmbHlJbk91dCBbQC5kaXNhYmxlZF09XCJkaXNhYmxlQW5pbWF0aW9uXCIgKm5nSWY9XCJzaG93QmFja2Ryb3AgJiYgaXNBY3RpdmVcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmx5SW5PdXQnLCBbXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgIGluYWN0aXZlU3R5bGUsXG4gICAgICAgIGFuaW1hdGUodGltaW5nKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgIGFuaW1hdGUodGltaW5nLCBpbmFjdGl2ZVN0eWxlKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQnVzeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHVibGljIHdyYXBwZXJDbGFzczogc3RyaW5nO1xuICBwdWJsaWMgZGlzYWJsZUFuaW1hdGlvbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0JhY2tkcm9wID0gdHJ1ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBidXN5TW9uaXRvcjogU3Vic2NyaXB0aW9uO1xuICBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2luc3RhbmNlQ29uZmlnSG9sZGVyJykgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ2J1c3lFbWl0dGVyJykgcHJpdmF0ZSBidXN5RW1pdHRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmJ1c3lNb25pdG9yID0gdGhpcy5idXN5RW1pdHRlci5zdWJzY3JpYmUoKGlzQWN0aXZlOiBib29sZWFuKSA9PiB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmluc3RhbmNlQ29uZmlnSG9sZGVyLmNvbmZpZztcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgIHRoaXMud3JhcHBlckNsYXNzID0gY29uZmlnLndyYXBwZXJDbGFzcztcbiAgICAgIHRoaXMuc2hvd0JhY2tkcm9wID0gY29uZmlnLmJhY2tkcm9wO1xuICAgICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9uID0gY29uZmlnLmRpc2FibGVBbmltYXRpb247XG4gICAgICBpZiAodGhpcy5jZHIpIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5idXN5TW9uaXRvcikge1xuICAgICAgdGhpcy5idXN5TW9uaXRvci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSwgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLCBJbmplY3RvcixcbiAgSW5wdXQsIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLCBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL2xpbmtlci92aWV3X3JlZic7XG5pbXBvcnQgeyBCdXN5VHJhY2tlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQnVzeUNvbmZpZyB9IGZyb20gJy4vbW9kZWwvYnVzeS1jb25maWcnO1xuaW1wb3J0IHsgTmdCdXN5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvbmctYnVzeS9uZy1idXN5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4vdXRpbC9pc1Byb21pc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdCdXN5XScsXG4gIHByb3ZpZGVyczogW0J1c3lUcmFja2VyU2VydmljZSwgSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0J1c3lEaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ25nQnVzeScpXG4gIHNldCBvcHRpb25zKG9wKSB7XG4gICAgdGhpcy5fb3B0aW9uID0gb3A7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uO1xuICB9XG5cbiAgQE91dHB1dCgpIGJ1c3lTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJ1c3lTdG9wID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIG9wdGlvbnNOb3JtOiBJQnVzeUNvbmZpZztcbiAgcHJpdmF0ZSBidXN5UmVmOiBDb21wb25lbnRSZWY8TmdCdXN5Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBjb21wb25lbnRWaWV3UmVmOiBWaWV3UmVmO1xuICBwcml2YXRlIG9uU3RhcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBvblN0b3BTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBidXN5RW1pdHRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIHB1YmxpYyB0ZW1wbGF0ZU5nU3R5bGU6IHt9O1xuICBwcml2YXRlIF9vcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ0hvbGRlcjogQnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHRyYWNrZXI6IEJ1c3lUcmFja2VyU2VydmljZSxcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMub25TdGFydFN1YnNjcmlwdGlvbiA9IHRyYWNrZXIub25TdGFydEJ1c3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlY3JlYXRlQnVzeUlmTmVjZXNzYXJ5KCk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idXN5RW1pdHRlci5lbWl0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICAgICAgdGhpcy5idXN5U3RhcnQuZW1pdCgpO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gICAgdGhpcy5vblN0b3BTdWJzY3JpcHRpb24gPSB0cmFja2VyLm9uU3RvcEJ1c3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmJ1c3lFbWl0dGVyLmVtaXQodGhpcy5pc0xvYWRpbmcpO1xuICAgICAgdGhpcy5idXN5U3RvcC5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5vcHRpb25zTm9ybSA9IHRoaXMubm9ybWFsaXplT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuaW5zdGFuY2VDb25maWdIb2xkZXIuY29uZmlnID0gdGhpcy5vcHRpb25zTm9ybTtcbiAgICB0aGlzLnRyYWNrZXIubG9hZCh7XG4gICAgICBidXN5TGlzdDogdGhpcy5vcHRpb25zTm9ybS5idXN5LFxuICAgICAgZGVsYXk6IHRoaXMub3B0aW9uc05vcm0uZGVsYXksXG4gICAgICBtaW5EdXJhdGlvbjogdGhpcy5vcHRpb25zTm9ybS5taW5EdXJhdGlvblxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95Q29tcG9uZW50cygpO1xuICAgIHRoaXMub25TdGFydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMub25TdG9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlY3JlYXRlQnVzeUlmTmVjZXNzYXJ5KCkge1xuICAgIGlmICghdGhpcy5idXN5UmVmXG4gICAgICB8fCB0aGlzLnRlbXBsYXRlICE9PSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlXG4gICAgICB8fCB0aGlzLnRlbXBsYXRlTmdTdHlsZSAhPT0gdGhpcy5vcHRpb25zTm9ybS50ZW1wbGF0ZU5nU3R5bGVcbiAgICApIHtcbiAgICAgIHRoaXMuZGVzdHJveUNvbXBvbmVudHMoKTtcbiAgICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlO1xuICAgICAgdGhpcy50ZW1wbGF0ZU5nU3R5bGUgPSB0aGlzLm9wdGlvbnNOb3JtLnRlbXBsYXRlTmdTdHlsZTtcbiAgICAgIHRoaXMuY3JlYXRlQnVzeSgpO1xuICAgICAgdGhpcy5idXN5RW1pdHRlci5lbWl0KHRoaXMuaXNMb2FkaW5nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5vcm1hbGl6ZU9wdGlvbnMob3B0aW9uczogYW55KTogSUJ1c3lDb25maWcge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHsgYnVzeTogW10gfTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucylcbiAgICAgIHx8IGlzUHJvbWlzZShvcHRpb25zKVxuICAgICAgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvblxuICAgICkge1xuICAgICAgb3B0aW9ucyA9IHsgYnVzeTogb3B0aW9ucyB9O1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWdIb2xkZXIuY29uZmlnLCBvcHRpb25zKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5idXN5KSkge1xuICAgICAgb3B0aW9ucy5idXN5ID0gW29wdGlvbnMuYnVzeV07XG4gICAgfVxuXG4gICAgb3B0aW9ucy5idXN5ID0gb3B0aW9ucy5idXN5Lm1hcChiID0+IHtcbiAgICAgIGlmIChiLmhhc093blByb3BlcnR5KCd0b1Byb21pc2UnKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnb2JzZXJ2YWJsZScpO1xuICAgICAgICByZXR1cm4gYi50b1Byb21pc2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lDb21wb25lbnRzKCkge1xuICAgIGlmICh0aGlzLmJ1c3lSZWYpIHtcbiAgICAgIHRoaXMuYnVzeVJlZi5kZXN0cm95KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbXBvbmVudFZpZXdSZWYpIHtcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jb21wb25lbnRWaWV3UmVmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJ1c3koKSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdCdXN5Q29tcG9uZW50KTtcbiAgICBjb25zdCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdpbnN0YW5jZUNvbmZpZ0hvbGRlcicsXG4gICAgICAgICAgdXNlVmFsdWU6IHRoaXMuaW5zdGFuY2VDb25maWdIb2xkZXJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdidXN5RW1pdHRlcicsXG4gICAgICAgICAgdXNlVmFsdWU6IHRoaXMuYnVzeUVtaXR0ZXJcbiAgICAgICAgfVxuICAgICAgXSwgcGFyZW50OiB0aGlzLmluamVjdG9yXG4gICAgfSk7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMub3B0aW9uc05vcm0udGVtcGxhdGU7XG4gICAgdGhpcy5idXN5UmVmID0gdGhpcy52Y3IuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIGluamVjdG9yLCB0aGlzLmdlbmVyYXRlTmdDb250ZW50KGluamVjdG9yKSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlTmdDb250ZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIGlmICh0eXBlb2YgdGhpcy50ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy50ZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gW1tlbGVtZW50XV07XG4gICAgfVxuICAgIGlmICh0aGlzLnRlbXBsYXRlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLnRlbXBsYXRlLmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcbiAgICAgIHJldHVybiBbdmlld1JlZi5yb290Tm9kZXNdO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnRlbXBsYXRlKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShpbmplY3Rvcik7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnRlbXBsYXRlTmdTdHlsZSA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZU5nU3R5bGU7XG4gICAgdGhpcy5jb21wb25lbnRWaWV3UmVmID0gY29tcG9uZW50UmVmLmhvc3RWaWV3O1xuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5jb21wb25lbnRWaWV3UmVmKTtcbiAgICByZXR1cm4gW1tjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dO1xuICB9XG5cbn1cbiIsImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCdXN5Q29uZmlnLCBEZWZhdWx0QnVzeUNvbXBvbmVudCwgSUJ1c3lDb25maWd9IGZyb20gJy4vbW9kZWwvYnVzeS1jb25maWcnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1c3lUcmFja2VyU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL2J1c3ktdHJhY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7QnVzeUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9idXN5LWNvbmZpZy1ob2xkZXIuc2VydmljZSc7XG5pbXBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi9uZy1idXN5LmRpcmVjdGl2ZSc7XG5pbXBvcnQge05nQnVzeUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbmctYnVzeS9uZy1idXN5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWZhdWx0QnVzeUNvbXBvbmVudCwgTmdCdXN5RGlyZWN0aXZlLCBOZ0J1c3lDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtCdXN5Q29uZmlnSG9sZGVyU2VydmljZSwgQnVzeVRyYWNrZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW05nQnVzeURpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlZmF1bHRCdXN5Q29tcG9uZW50LCBOZ0J1c3lDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nQnVzeU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogSUJ1c3lDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nQnVzeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQnVzeUNvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIG5nLWJ1c3lcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9uZy1idXN5Lm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9idXN5LWNvbmZpZyc7XG5leHBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi9saWIvbmctYnVzeS5kaXJlY3RpdmUnO1xuZXhwb3J0IHtJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4vbGliL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtOZ0J1c3lDb21wb25lbnQgYXMgw4nCtWN9IGZyb20gJy4vbGliL2NvbXBvbmVudC9uZy1idXN5L25nLWJ1c3kuY29tcG9uZW50JztcbmV4cG9ydCB7QnVzeUNvbmZpZ0hvbGRlclNlcnZpY2UgYXMgw4nCtWJ9IGZyb20gJy4vbGliL3NlcnZpY2UvYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UnO1xuZXhwb3J0IHtCdXN5VHJhY2tlclNlcnZpY2UgYXMgw4nCtWF9IGZyb20gJy4vbGliL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UnOyJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbXBvbmVudCIsIkluamVjdCIsIkV2ZW50RW1pdHRlciIsInRpbWVyIiwiZnJvbSIsIk9wdGlvbmFsIiwic3R5bGUiLCJ0cmlnZ2VyIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIlN1YnNjcmlwdGlvbiIsIkluamVjdG9yIiwiVGVtcGxhdGVSZWYiLCJEaXJlY3RpdmUiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJBcHBsaWNhdGlvblJlZiIsIlZpZXdDb250YWluZXJSZWYiLCJFbGVtZW50UmVmIiwiUmVuZGVyZXIyIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBOEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFB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