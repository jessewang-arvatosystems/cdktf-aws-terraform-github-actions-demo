// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from "constructs";
import {App, TerraformStack} from "cdktf";
import {AwsProvider} from "@cdktf/provider-aws/lib/provider";
import {S3Bucket} from "@cdktf/provider-aws/lib/s3-bucket";
import {S3BucketAcl} from "@cdktf/provider-aws/lib/s3-bucket-acl";
import {S3BucketVersioningA} from "@cdktf/provider-aws/lib/s3-bucket-versioning";
import {S3Object} from "@cdktf/provider-aws/lib/s3-object";

const {
  acl,
  bucket,
  region,
  terraform_folder
} = require("./variables.json");

export class CoreStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {region});

    new S3Construct(this, "s3")
  }
}

export class S3Construct extends Construct {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const s3Bucket = new S3Bucket(this, "bucket-backend", {bucket})

    new S3BucketAcl(this, "bucket-backend-acl", {
      bucket: s3Bucket.id,
      acl
    })

    new S3BucketVersioningA(this, "bucket-backend-versioning", {
      bucket: s3Bucket.id,
      versioningConfiguration: {
        status: "Enabled"
      }
    })

    new S3Object(this, "terraform_folder", {
      bucket: s3Bucket.id,
      key: terraform_folder
    })
  }
}

const app = new App();
new CoreStack(app, "cdktf-terraform-github-actions-demo");
app.synth();
