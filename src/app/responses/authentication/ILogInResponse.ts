import { AccountModelV2 } from "src/app/models/AccountModelV2";
import { IResponse } from "../IResponse";

export interface ILogInResponse extends IResponse<AccountModelV2> {
    token: string;
}
