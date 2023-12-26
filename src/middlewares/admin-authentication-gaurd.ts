import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { headerName } from "../utils/common-constant";
import { getUserProfile } from "../utils/utils";
import { verifyToken } from "./token-handler";

@Injectable()
export default class AdminAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const token = request.headers[headerName];

      if (!token) {
        return false;
      }

      const { userId } = await verifyToken(token);

      const user = await getUserProfile(userId);

      if (!user) {
        return false;
      }

      request[`user`] = {
        userId,
      };

      return true;
    } catch (error) {
      throw error;
    }
  }
}
