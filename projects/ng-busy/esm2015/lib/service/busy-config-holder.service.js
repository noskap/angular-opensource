import { Injectable, Optional } from '@angular/core';
import { BUSY_CONFIG_DEFAULTS, BusyConfig } from '../model/busy-config';
import * as i0 from "@angular/core";
import * as i1 from "../model/busy-config";
export class BusyConfigHolderService {
    constructor(config) {
        this.config = Object.assign({}, BUSY_CONFIG_DEFAULTS, config || new BusyConfig());
    }
}
BusyConfigHolderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
BusyConfigHolderService.ctorParameters = () => [
    { type: BusyConfig, decorators: [{ type: Optional }] }
];
BusyConfigHolderService.ngInjectableDef = i0.defineInjectable({ factory: function BusyConfigHolderService_Factory() { return new BusyConfigHolderService(i0.inject(i1.BusyConfig, 8)); }, token: BusyConfigHolderService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvYnVzeS1jb25maWctaG9sZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7QUFLdEUsTUFBTTtJQUdKLFlBQXdCLE1BQWtCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxJQUFJLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNwRixDQUFDOzs7WUFSRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQUo2QixVQUFVLHVCQVF6QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JVU1lfQ09ORklHX0RFRkFVTFRTLCBCdXN5Q29uZmlnfSBmcm9tICcuLi9tb2RlbC9idXN5LWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJ1c3lDb25maWdIb2xkZXJTZXJ2aWNlIHtcbiAgY29uZmlnOiBCdXN5Q29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIGNvbmZpZzogQnVzeUNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgQlVTWV9DT05GSUdfREVGQVVMVFMsIGNvbmZpZyB8fCBuZXcgQnVzeUNvbmZpZygpKTtcbiAgfVxufVxuIl19