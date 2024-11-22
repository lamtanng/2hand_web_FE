import { StoreProps } from "./store.type";

export interface ServiceProps {
    store: StoreProps,
    services: any,
}

export interface ShipmentProps {
    store: StoreProps,
    service_type_id: number,
    total: number,
}