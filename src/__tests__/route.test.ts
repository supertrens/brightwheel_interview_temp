import app from "../server";
import supertest from "supertest";

const testData = {
  id: "36d5658a-6908-479e-887e-a949ec199272",
  readings: [
    {
      timestamp: "2021-09-29T16:08:15+01:00",
      count: 2,
    },
    {
      timestamp: "2021-09-29T16:09:15+01:00",
      count: 15,
    },
  ],
};

describe("POST /v1/devices", () => {
  it("should create a new device reading entry", async () => {
    const res = await supertest(app)
      .post("/v1/devices")
      .send(testData)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: testData });
  });
});

describe("GET /v1/devices/:deviceId", () => {
  it("should response gracefully when device is not in DB", async () => {
    const deviceId = "12346";

    const res = await supertest(app)
      .get(`/v1/devices/${deviceId}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ data: { message: "Device not found" } });
  });

  it("should send device object when device is found", async () => {
    // we first create a device reading
    await supertest(app)
      .post("/v1/devices")
      .send(testData)
      .set("Accept", "application/json");

    // testing scenario
    const res = await supertest(app)
      .get(`/v1/devices/${testData.id}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: testData });
  });
});

describe("GET /v1/devices/:deviceId/latest", () => {
  it("should response gracefully when device is not in DB", async () => {
    const deviceId = "12346";

    const res = await supertest(app)
      .get(`/v1/devices/${deviceId}/latest`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ data: { message: "Device not found" } });
  });

  it("should send device the timestamp of the device latest reading", async () => {
    // we first create a device reading
    await supertest(app)
      .post("/v1/devices")
      .send(testData)
      .set("Accept", "application/json");

    // testing scenario
    const res = await supertest(app)
      .get(`/v1/devices/${testData.id}/latest`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ latest_timestamp: "2021-09-29T16:09:15+01:00" });
  });
});

describe("GET /v1/devices/:deviceId/cumulative", () => {
  it("should response gracefully when device is not in DB", async () => {
    const deviceId = "12346";

    const res = await supertest(app)
      .get(`/v1/devices/${deviceId}/cumulative`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ data: { message: "Device not found" } });
  });

  it("should send device total readings", async () => {
    // we first create a device reading
    await supertest(app)
      .post("/v1/devices")
      .send(testData)
      .set("Accept", "application/json");

    // testing scenario
    const res = await supertest(app)
      .get(`/v1/devices/${testData.id}/cumulative`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cumulative_count: 17 });
  });
});
