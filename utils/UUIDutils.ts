import {v4} from "uuid";
import {Buffer} from "../node_modules/buffer/index";

export function generateUUId(): string {
	return Buffer.from(v4().replace(/-/g, ''), 'hex').toString();
}