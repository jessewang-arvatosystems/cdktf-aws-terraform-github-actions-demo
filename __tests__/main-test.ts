// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import "cdktf/lib/testing/adapters/jest"; // Load types for expect matchers
import { Testing } from "cdktf";
import {CoreStack, S3Construct} from "../main";
import {S3Bucket} from "@cdktf/provider-aws/lib/s3-bucket";
import {S3BucketAcl} from "@cdktf/provider-aws/lib/s3-bucket-acl";
import {S3BucketVersioningA} from "@cdktf/provider-aws/lib/s3-bucket-versioning";
import {S3Object} from "@cdktf/provider-aws/lib/s3-object";

const {
  acl,
  bucket,
  terraform_folder
} = require("../variables.json");

describe("Test CDKTF Application", () => {

  describe("S3 Bucket", () => {

    let expectObj : jest.JestMatchers<String>;
    beforeAll(() => {
      expectObj = expect(
          Testing.synthScope((scope) => {
            new S3Construct(scope, "my-app");
          })
      );
    });

    it("should exist", () => {
      expectObj.toHaveResourceWithProperties(S3Bucket, {bucket});
    });

    it("ACL is assigned", () => {
      expectObj.toHaveResourceWithProperties(S3BucketAcl, {acl});
    });

    it("versioning is enabled", () => {
      expectObj.toHaveResourceWithProperties(S3BucketVersioningA, {
        versioning_configuration: {
          status: "Enabled"
        }
      });
    });

    it("terraform sub folder exists", () => {
      expectObj.toHaveResourceWithProperties(S3Object, {
        key: terraform_folder
      });
    });

  });

  describe("Verifying terraform configuration", () => {

    let expectObj : jest.JestMatchers<String>;
    beforeAll(() => {
      const app = Testing.app();
      const stack = new CoreStack(app, "test");

      expectObj = expect(Testing.fullSynth(stack))
    });

    it("is valid", () => {
      expectObj.toBeValidTerraform();
    });

    it("can be planned", () => {
      expectObj.toPlanSuccessfully();
    });
  });
});
