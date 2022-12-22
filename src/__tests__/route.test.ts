import app from "../server";
import supertest from "supertest";

describe("/GET", () => {
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

  it("should create a new device reading entry", async () => {
    const res = await supertest(app)
      .post("/v1/devices")
      .send(testData)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ data: testData });
  });
});
