import { NextRequest } from "../src/lib/interfaces/next-request";
import { createDummyRes } from "./util/dummyRes";
import { NextApiConfiguration } from "../src/lib/interfaces/next-api-configuration";
import { apiHandler } from "../src/";

test("Allows user to send correct content-type", async () => {
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

test("Fails when user doesn't send correct content-type", async () => {
  const dummyReq: NextRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/text-utf-8",
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

  expect(dummyRes.mockStatus).toBe(422);
});
