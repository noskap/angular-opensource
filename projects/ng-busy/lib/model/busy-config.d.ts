import { Subscription } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';
import { InstanceConfigHolderService } from '../service/instance-config-holder.service';
export declare class BusyConfig implements IBusyConfig {
    template: TemplateRef<any> | Type<any>;
    templateNgStyle: {};
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
    disableAnimation: boolean;
    constructor(config?: IBusyConfig);
}
export declare class DefaultBusyComponent {
    private instanceConfigHolder;
    constructor(instanceConfigHolder: InstanceConfigHolderService);
    readonly message: string;
}
export interface IBusyConfig {
    template?: TemplateRef<any> | Type<any>;
    templateNgStyle?: {};
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Array<Promise<any> | Subscription>;
    disableAnimation?: boolean;
}
export declare const BUSY_CONFIG_DEFAULTS: {
    template: typeof DefaultBusyComponent;
    templateNgStyle: {};
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
    disableAnimation: boolean;
};
