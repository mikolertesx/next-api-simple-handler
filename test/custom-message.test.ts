import { NextRequest } from "../src/lib/interfaces/next-request";
import { createDummyRes } from "./util/dummyRes";
import { NextApiConfiguration } from "../src/lib/interfaces/next-api-configuration";
import { apiHandler } from "../src/";

test("Prints custom message in wrong content type", async () => {
  const dummyReq: NextRequest = {
    method: "GET",
    body: "",
    headers: {
      "content-type": "not-application/json",
    },
  };
  const dummyConfig: NextApiConfiguration = {
    contentType: "application/json",
    errorMessages: {
      "wrong-content-type": (_expected, _received) => "WRONG CONTENT TYPE",
    },
    errorCodes: {
      "wrong-content-type": 500,
    },
  };
  const dummyRes = createDummyRes();

  await apiHandler(dummyReq, dummyRes, dummyConfig, async (req, res) => {
    res.json({ message: "HI" });
  });

  expect(dummyRes.mockData).toBe('{"error":"WRONG CONTENT TYPE"}');
	expect(dummyRes.mockStatus).toBe(500);
});
test("Prints custom message in wrong method", async () => {
  const dummyReq: NextRequest = {
    method: "POST",
    body: "",
    headers: {},
  };
  const dummyRes = createDummyRes();
  const dummyConfig: NextApiConfiguration = {
    methods: ["GET"],
    errorMessages: {
      "wrong-method": (_methods) => "WRONG METHOD",
    },
    errorCodes: {
      "wrong-method": 500,
    },
  };

  await apiHandler(dummyReq, dummyRes, dummyConfig, async (req, res) => {
    res.json({ message: "HI" });
  });

  expect(dummyRes.mockData).toBe('{"error":"WRONG METHOD"}');
  expect(dummyRes.mockStatus).toBe(500);
});

test("Prints custom message in missing body key", async () => {
  const dummyReq: NextRequest = {
    method: "POST",
    body: '{"username":"Miguel"}',
    headers: {
      "content-type": "application/json",
    },
  };

  const dummyRes = createDummyRes();
  const dummyConfig: NextApiConfiguration = {
    methods: ["POST"],
    requiredBody: ["username", "password"],
    errorMessages: {
      "missing-body-key": (_missingKeys) => "WRONG KEYS",
    },
    errorCodes: {
      "missing-body-key": 500,
    },
  };

  await apiHandler(dummyReq, dummyRes, dummyConfig, async (req, res) => {
    res.json({ message: "HI" });
  });

  expect(dummyRes.mockData).toBe('{"error":"WRONG KEYS"}');
  expect(dummyRes.mockStatus).toBe(500);
});
