import "cdktf/lib/testing/adapters/jest";
import {Testing} from "cdktf";
import {S3Construct} from "../../constructs/s3";
import {S3Bucket} from "@cdktf/provider-aws/lib/s3-bucket";
import {S3BucketAcl} from "@cdktf/provider-aws/lib/s3-bucket-acl";
import {S3BucketVersioningA} from "@cdktf/provider-aws/lib/s3-bucket-versioning";
import {S3Object} from "@cdktf/provider-aws/lib/s3-object";

const {
    acl,
    bucket,
    terraform_folder
} = require("../../variables.json");

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