import { NextRequest } from "../src/lib/interfaces/next-request";
import { createDummyRes } from "./util/dummyRes";
import { NextApiConfiguration } from "../src/lib/interfaces/next-api-configuration";
import { apiHandler } from "../src";

test("Only get method allowed", async () => {
  const dummyReq: NextRequest = {
    method: "POST",
    headers: {},
    body: "",
  };
  const dummyRes = createDummyRes();

  const dummyConfig: NextApiConfiguration = {
    methods: ["GET"],
  };

  await apiHandler(dummyReq, dummyRes, dummyConfig, async (req, res) => {
    await res.status(200).json({
      data: "It worked!",
    });
  });

  expect(dummyRes.mockStatus).toBe(422);
  expect(
    dummyRes.mockData ===
      '{"error":"Only methods GET are permitted on this route."}',
  );
});

test("Only post method allowed", async () => {
  const dummyReq: NextRequest = {
    method: "GET",
    headers: {},
    body: "",
  };
  const dummyRes = createDummyRes();

  const dummyConfig: NextApiConfiguration = {
    methods: ["POST"],
  };

  await apiHandler(dummyReq, dummyRes, dummyConfig, async (req, res) => {
    await res.status(200).json({
      data: "It worked!",
    });
  });

  expect(dummyRes.mockStatus).toBe(422);
});
