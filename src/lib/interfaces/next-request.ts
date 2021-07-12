import { Methods } from "../types/MethodType";
import { HeaderKeys } from "../types/HeaderKeysType";

export interface NextRequest {
	method: Methods;
	headers: {[key: HeaderKeys]: string};
	body: any;
}