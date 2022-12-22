export interface Reading {
  timestamp: string;
  count: number;
}

export interface DeviceReading {
  id: string;
  readings: Reading[];
}
