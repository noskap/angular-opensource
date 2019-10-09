import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { InstanceConfigHolderService } from '../service/instance-config-holder.service';
var BusyConfig = /** @class */ (function () {
    function BusyConfig(config) {
        var e_1, _a;
        if (config === void 0) { config = {}; }
        try {
            for (var _b = tslib_1.__values(Object.keys(BUSY_CONFIG_DEFAULTS)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export { BusyConfig };
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
export { DefaultBusyComponent };
export var BUSY_CONFIG_DEFAULTS = {
    template: DefaultBusyComponent,
    templateNgStyle: {},
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy',
    disableAnimation: false
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL21vZGVsL2J1c3ktY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFxQixNQUFNLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBRXRGO0lBVUUsb0JBQVksTUFBd0I7O1FBQXhCLHVCQUFBLEVBQUEsV0FBd0I7O1lBQ2xDLEtBQXFCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQW5ELElBQU0sTUFBTSxXQUFBO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdGOzs7Ozs7Ozs7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQzs7QUFFRDtJQTBCRSw4QkFBb0Qsb0JBQWlEO1FBQWpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7SUFDckcsQ0FBQztJQUVELHNCQUFJLHlDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2xELENBQUM7OztPQUFBOztnQkEvQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsazBCQW9CVDtpQkFDRjs7O2dCQTFDTywyQkFBMkIsdUJBNkNwQixNQUFNLFNBQUMsc0JBQXNCOztJQU01QywyQkFBQztDQUFBLEFBaENELElBZ0NDO1NBUlksb0JBQW9CO0FBc0JqQyxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLGVBQWUsRUFBRSxFQUFFO0lBQ25CLEtBQUssRUFBRSxDQUFDO0lBQ1IsV0FBVyxFQUFFLENBQUM7SUFDZCxRQUFRLEVBQUUsSUFBSTtJQUNkLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsWUFBWSxFQUFFLFNBQVM7SUFDdkIsZ0JBQWdCLEVBQUUsS0FBSztDQUN4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtDb21wb25lbnQsIFRlbXBsYXRlUmVmLCBUeXBlLCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2luc3RhbmNlLWNvbmZpZy1ob2xkZXIuc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBCdXN5Q29uZmlnIGltcGxlbWVudHMgSUJ1c3lDb25maWcge1xuICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IFR5cGU8YW55PjtcbiAgdGVtcGxhdGVOZ1N0eWxlOiB7fTtcbiAgZGVsYXk6IG51bWJlcjtcbiAgbWluRHVyYXRpb246IG51bWJlcjtcbiAgYmFja2Ryb3A6IGJvb2xlYW47XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgd3JhcHBlckNsYXNzOiBzdHJpbmc7XG4gIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQnVzeUNvbmZpZyA9IHt9KSB7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMoQlVTWV9DT05GSUdfREVGQVVMVFMpKSB7XG4gICAgICB0aGlzW29wdGlvbl0gPSBjb25maWdbb3B0aW9uXSAhPT0gdW5kZWZpbmVkID8gY29uZmlnW29wdGlvbl0gOiBCVVNZX0NPTkZJR19ERUZBVUxUU1tvcHRpb25dO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWZhdWx0LWJ1c3knLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiBjbGFzcz1cIm5nLWJ1c3ktZGVmYXVsdC13cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5nLWJ1c3ktZGVmYXVsdC1zaWduXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1idXN5LWRlZmF1bHQtc3Bpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjFcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyM1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI1XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyNlwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI4XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyOVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjEwXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyMTFcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIxMlwiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5nLWJ1c3ktZGVmYXVsdC10ZXh0XCI+e3ttZXNzYWdlfX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0QnVzeUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgnaW5zdGFuY2VDb25maWdIb2xkZXInKSBwcml2YXRlIGluc3RhbmNlQ29uZmlnSG9sZGVyOiBJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2UpIHtcbiAgfVxuXG4gIGdldCBtZXNzYWdlKCkge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlQ29uZmlnSG9sZGVyLmNvbmZpZy5tZXNzYWdlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJ1c3lDb25maWcge1xuICB0ZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIHRlbXBsYXRlTmdTdHlsZT86IHt9O1xuICBkZWxheT86IG51bWJlcjtcbiAgbWluRHVyYXRpb24/OiBudW1iZXI7XG4gIGJhY2tkcm9wPzogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgd3JhcHBlckNsYXNzPzogc3RyaW5nO1xuICBidXN5PzogQXJyYXk8UHJvbWlzZTxhbnk+IHwgU3Vic2NyaXB0aW9uPjtcbiAgZGlzYWJsZUFuaW1hdGlvbj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBCVVNZX0NPTkZJR19ERUZBVUxUUyA9IHtcbiAgdGVtcGxhdGU6IERlZmF1bHRCdXN5Q29tcG9uZW50LFxuICB0ZW1wbGF0ZU5nU3R5bGU6IHt9LFxuICBkZWxheTogMCxcbiAgbWluRHVyYXRpb246IDAsXG4gIGJhY2tkcm9wOiB0cnVlLFxuICBtZXNzYWdlOiAnUGxlYXNlIHdhaXQuLi4nLFxuICB3cmFwcGVyQ2xhc3M6ICduZy1idXN5JyxcbiAgZGlzYWJsZUFuaW1hdGlvbjogZmFsc2Vcbn07XG4iXX0=