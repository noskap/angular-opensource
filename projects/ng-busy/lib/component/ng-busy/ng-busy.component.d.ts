import { ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { InstanceConfigHolderService } from '../../service/instance-config-holder.service';
export declare class NgBusyComponent implements OnDestroy {
    private instanceConfigHolder;
    private busyEmitter;
    private readonly cdr;
    wrapperClass: string;
    disableAnimation: boolean;
    showBackdrop: boolean;
    private readonly busyMonitor;
    isActive: boolean;
    constructor(instanceConfigHolder: InstanceConfigHolderService, busyEmitter: EventEmitter<boolean>, cdr: ChangeDetectorRef);
    ngOnDestroy(): void;
}
