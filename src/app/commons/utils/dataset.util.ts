import { DEVICE_TYPE, DEVICE_LOCATION } from '@app/market/data/device-const';

export function translateDeviceTypeLocation(res: any) {
    const typeName = DEVICE_TYPE.find((val: any) => val.value === res.type);
    const locationName = DEVICE_LOCATION.find((val: any) => val.value === res.location);
    res.type = typeName?.name;
    res.location = locationName?.name;
    return res;
}