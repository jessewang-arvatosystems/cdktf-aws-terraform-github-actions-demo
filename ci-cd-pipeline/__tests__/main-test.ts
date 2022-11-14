// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import "cdktf/lib/testing/adapters/jest";
import {Testing} from "cdktf";
import {CI_CD_PipelineStack} from "../main";

describe("Verifying ci-cd-pipeline configuration", () => {

  let expectObj : jest.JestMatchers<String>;
  beforeAll(() => {
    const app = Testing.app();
    const stack = new CI_CD_PipelineStack(app, "ci-cd-pipeline-stack-test");

    expectObj = expect(Testing.fullSynth(stack))
  });

  it("is valid", () => {
    expectObj.toBeValidTerraform();
  });

  it("can be planned", () => {
    expectObj.toPlanSuccessfully();
  });

});
