import { NextRequest } from "../src/lib/interfaces/next-request";
import { createDummyRes } from "./util/dummyRes";
import { NextApiConfiguration } from "../src/lib/interfaces/next-api-configuration";
import { apiHandler } from "../src/";

test("Allows user to register", async () => {
  const dummyReq: NextRequest = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      "username": "Miguel",
      "password": "guapon12",
    },
  };
  const dummyRes = createDummyRes();

  const dummyConfig: NextApiConfiguration = {
    methods: ["POST"],
    contentType: "application/json",
    requiredBody: ["username", "password"],
  };

  await apiHandler(dummyReq, dummyRes, dummyConfig, async (req, res) => {
    await res.status(200).json({
      data: "It worked!",
    });
  });

  expect(dummyRes.mockStatus).toBe(200);
});

test("Fails when user can't register", async () => {
  const dummyReq: NextRequest = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      "username": "Miguel",
    },
  };
  const dummyRes = createDummyRes();

  const dummyConfig: NextApiConfiguration = {
    methods: ["POST"],
    contentType: "application/json",
    requiredBody: ["username", "password"],
  };

  await apiHandler(
    dummyReq,
    dummyRes,
    dummyConfig,
    async (req, res) => {
      await res.status(200).json({
        data: "It worked!",
      });
    },
  );

  expect(dummyRes.mockStatus).toBe(422);
});
