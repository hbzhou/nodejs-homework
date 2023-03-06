import { describe, expect, it, jest } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";

import { findAll } from "../data-access/user.repository";
import { getUsers } from "./user.controller";

describe("user controller", () => {
  jest.mock("../../src/data-access/user.repository.ts");
  const req = getMockReq();
  const resp = getMockRes().res;
  it("it should return users not deleted", async () => {
    jest.mocked(findAll).mockImplementation(async () => []);
    await getUsers(req, resp);
    expect(resp.json).toHaveLength(1);
    expect(resp.json).toBeCalledWith([]);
  });
});
