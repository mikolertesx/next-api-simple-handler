import { NextResponse } from "../../src/lib/interfaces/next-response";

export interface MockingResponse extends NextResponse {
  mockStatus?: number;
  mockData?: string;
}