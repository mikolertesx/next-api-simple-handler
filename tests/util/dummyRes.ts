import { MockingResponse } from "../mocks/mocking-response";

export const createDummyRes = (): MockingResponse => {
  return {
    mockStatus: 200,
    mockData: "",
    status: function (statusCode: number) {
      this.mockStatus = statusCode;
      return this;
    },
    json: function (jsonData: any) {
      this.mockData = JSON.stringify(jsonData);
      return this;
    },
  };
};
