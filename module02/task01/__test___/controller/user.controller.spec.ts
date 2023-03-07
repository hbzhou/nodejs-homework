import { getMockReq, getMockRes } from "@jest-mock/express";

import * as userRepository from "../../src/data-access/user.repository";
import { User } from "../../src/models/user.model";
import { getUsers } from "../../src/controller/user.controller";

jest.mock("../../src/data-access/user.repository.ts");
const mockedUsers = [
  {
    id: 9999,
    login: "john",
    password: "password",
    age: 21,
    isDeleted: false,
  },
  {
    id: 8888,
    login: "jeremy",
    password: "password",
    age: 21,
    isDeleted: true,
  },
];
describe("user controller", () => {
  const req = getMockReq();
  const resp = getMockRes();
  beforeEach(() => {
    resp.mockClear();
  });
  it("it should return users not deleted", async () => {
    jest.spyOn(userRepository, "findAll").mockReturnValue(Promise.resolve(mockedUsers as User[]));
    await getUsers(req, resp.res);
    expect(resp.res.json).toBeCalled();
    expect(resp.res.json).toBeCalledWith([
      {
        id: 9999,
        login: "john",
        password: "password",
        age: 21,
        isDeleted: false,
      },
    ]);
  });
});
