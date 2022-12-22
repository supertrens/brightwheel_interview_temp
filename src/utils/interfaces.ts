export interface Reading {
  timestamp: Date;
  count: number;
}

export interface DeviceReading {
  id: string;
  readings: Reading[];
}
