import { getUniqueListBy } from "./helpers";
import { DeviceReading } from "./interfaces";

const deviceDB = new Map();

const isDeviceFound = (id: string) => deviceDB.has(id);

const addNewDeviceEntry = (data: DeviceReading) => {
  deviceDB.set(data.id, data);
  return deviceDB.get(data.id);
};

const updateExistingDeviceEntry = (data: DeviceReading): DeviceReading => {
  const device: DeviceReading = deviceDB.get(data.id);

  const uniqueReadings = getUniqueListBy(
    [...device.readings, ...data.readings],
    "timestamp"
  );

  device.readings = uniqueReadings;

  return deviceDB.get(data.id);
};

const findOneAndUpdate = (data: DeviceReading): DeviceReading => {
  const { id: deviceId } = data;
  return isDeviceFound(deviceId)
    ? updateExistingDeviceEntry(data)
    : addNewDeviceEntry(data);
};

export { findOneAndUpdate };
