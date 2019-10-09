import { EventEmitter, Injectable } from '@angular/core';
import { from, timer } from 'rxjs';
import { isPromise } from '../util/isPromise';
import * as i0 from "@angular/core";
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
    BusyTrackerService.ngInjectableDef = i0.defineInjectable({ factory: function BusyTrackerService_Factory() { return new BusyTrackerService(); }, token: BusyTrackerService, providedIn: "root" });
    return BusyTrackerService;
}());
export { BusyTrackerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS10cmFja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFlLElBQUksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztBQVE1QztJQWdDRTtRQTNCUSxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixjQUFTLEdBQXdCLEVBQUUsQ0FBQztRQUNwQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRTNCLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBb0JwQyxDQUFDO0lBbEJoQixzQkFBSSx3Q0FBUTthQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFhLEdBQVk7WUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDekI7WUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzth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S0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtJQUNBLENBQUM7O2dCQXhGRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OzZCQVpEO0NBbUdDLEFBekZELElBeUZDO1NBdEZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIGZyb20sIHRpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7aXNQcm9taXNlfSBmcm9tICcuLi91dGlsL2lzUHJvbWlzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tlck9wdGlvbnMge1xuICBtaW5EdXJhdGlvbjogbnVtYmVyO1xuICBkZWxheTogbnVtYmVyO1xuICBidXN5TGlzdDogQXJyYXk8UHJvbWlzZTxhbnk+IHwgU3Vic2NyaXB0aW9uPjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQnVzeVRyYWNrZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGlzRGVsYXlQcm9jZXNzaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgaXNEdXJhdGlvblByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0J1c2llc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBidXN5UXVldWU6IEFycmF5PFN1YnNjcmlwdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfX2lzQWN0aXZlID0gZmFsc2U7XG5cbiAgb25TdGFydEJ1c3k6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBvblN0b3BCdXN5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19pc0FjdGl2ZTtcbiAgfVxuXG4gIHNldCBpc0FjdGl2ZSh2YWw6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fX2lzQWN0aXZlID09PSBmYWxzZSAmJiB2YWwgPT09IHRydWUgJiYgdGhpcy5vblN0YXJ0QnVzeSkge1xuICAgICAgdGhpcy5vblN0YXJ0QnVzeS5lbWl0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9faXNBY3RpdmUgPT09IHRydWUgJiYgdmFsID09PSBmYWxzZSAmJiB0aGlzLm9uU3RvcEJ1c3kpIHtcbiAgICAgIHRoaXMuaXNCdXNpZXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm9uU3RvcEJ1c3kuZW1pdCgpO1xuICAgIH1cbiAgICB0aGlzLl9faXNBY3RpdmUgPSB2YWw7XG4gIH1cbiAgZ2V0IGJ1c3lMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmJ1c3lRdWV1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBsb2FkKG9wdGlvbnM6IFRyYWNrZXJPcHRpb25zKSB7XG4gICAgdGhpcy5sb2FkQnVzeVF1ZXVlKG9wdGlvbnMuYnVzeUxpc3QpO1xuICAgIHRoaXMuc3RhcnRMb2FkaW5nKG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBY3RpdmVTdGF0dXMoKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRoaXMuaXNCdXNpZXNQcm9jZXNzaW5nICYmXG4gICAgICAhdGhpcy5pc0RlbGF5UHJvY2Vzc2luZyAmJlxuICAgICAgKHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgfHwgdGhpcy5idXN5UXVldWUubGVuZ3RoID4gMCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0TG9hZGluZyhvcHRpb25zOiBUcmFja2VyT3B0aW9ucykge1xuICAgIGlmICghdGhpcy5pc0J1c2llc1Byb2Nlc3NpbmcgJiYgdGhpcy5idXN5TGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzQnVzaWVzUHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICB0aGlzLmlzRGVsYXlQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdHVzKCk7XG4gICAgICB0aW1lcihvcHRpb25zLmRlbGF5KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzRGVsYXlQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgICAgICB0aW1lcihvcHRpb25zLm1pbkR1cmF0aW9uKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNEdXJhdGlvblByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEJ1c3lRdWV1ZShidXNpZXM6IEFycmF5PFByb21pc2U8YW55PiB8IFN1YnNjcmlwdGlvbj4pIHtcbiAgICBidXNpZXMuZmlsdGVyKChidXN5KSA9PiB7XG4gICAgICByZXR1cm4gYnVzeSAmJiAhYnVzeS5oYXNPd25Qcm9wZXJ0eSgnX19sb2FkZWRfbWFya19ieV9uZ19idXN5Jyk7XG4gICAgfSkuZm9yRWFjaCgoYnVzeTogUHJvbWlzZTxhbnk+IHwgU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYnVzeSwgJ19fbG9hZGVkX21hcmtfYnlfbmdfYnVzeScsIHtcbiAgICAgICAgdmFsdWU6IHRydWUsIGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgbGV0IGN1cl9idXN5O1xuICAgICAgaWYgKGlzUHJvbWlzZShidXN5KSkge1xuICAgICAgICBjdXJfYnVzeSA9IGZyb20oYnVzeSkuc3Vic2NyaWJlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJfYnVzeSA9IGJ1c3k7XG4gICAgICB9XG4gICAgICB0aGlzLmFwcGVuZFRvUXVldWUoY3VyX2J1c3kpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRUb1F1ZXVlKGJ1c3k6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuYnVzeVF1ZXVlLnB1c2goYnVzeSk7XG4gICAgYnVzeS5hZGQoKCkgPT4ge1xuICAgICAgdGhpcy5idXN5UXVldWUgPSB0aGlzLmJ1c3lRdWV1ZS5maWx0ZXIoKGN1cjogU3Vic2NyaXB0aW9uKSA9PiAhY3VyLmNsb3NlZCk7XG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gIH1cbn1cbiJdfQ==