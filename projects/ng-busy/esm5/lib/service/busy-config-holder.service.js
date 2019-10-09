import { Injectable, Optional } from '@angular/core';
import { BUSY_CONFIG_DEFAULTS, BusyConfig } from '../model/busy-config';
import * as i0 from "@angular/core";
import * as i1 from "../model/busy-config";
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
    BusyConfigHolderService.ngInjectableDef = i0.defineInjectable({ factory: function BusyConfigHolderService_Factory() { return new BusyConfigHolderService(i0.inject(i1.BusyConfig, 8)); }, token: BusyConfigHolderService, providedIn: "root" });
    return BusyConfigHolderService;
}());
export { BusyConfigHolderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7QUFFdEU7SUFNRSxpQ0FBd0IsTUFBa0I7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLElBQUksSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7O2dCQVJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OztnQkFKNkIsVUFBVSx1QkFRekIsUUFBUTs7O2tDQVR2QjtDQVlDLEFBVEQsSUFTQztTQU5ZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCVVNZX0NPTkZJR19ERUZBVUxUUywgQnVzeUNvbmZpZ30gZnJvbSAnLi4vbW9kZWwvYnVzeS1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCdXN5Q29uZmlnSG9sZGVyU2VydmljZSB7XG4gIGNvbmZpZzogQnVzeUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBjb25maWc6IEJ1c3lDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIEJVU1lfQ09ORklHX0RFRkFVTFRTLCBjb25maWcgfHwgbmV3IEJ1c3lDb25maWcoKSk7XG4gIH1cbn1cbiJdfQ==