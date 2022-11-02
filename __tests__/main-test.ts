// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import "cdktf/lib/testing/adapters/jest";
import {Testing} from "cdktf";
import {CoreStack} from "../main";

describe("Verifying terraform configuration", () => {

  let expectObj : jest.JestMatchers<String>;
  beforeAll(() => {
    const app = Testing.app();
    const stack = new CoreStack(app, "core-stack-test");

    expectObj = expect(Testing.fullSynth(stack))
  });

  it("is valid", () => {
    expectObj.toBeValidTerraform();
  });

  it("can be planned", () => {
    expectObj.toPlanSuccessfully();
  });

});
