import { Injectable } from '@angular/core';

@Injectable()
export class RouteDataTransfer {
    private storage: Array<any> = [];

    public addElement(index: string, element: any) {
        this.storage[index] = element;
    }

    public getElement(index: string): any {
        return this.storage[index];
    }
}
