// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import {Construct} from "constructs";
import {App, TerraformStack} from "cdktf";
import {AwsProvider} from "@cdktf/provider-aws/lib/provider";
import {S3Construct} from "./constructs/s3";
import {GithubRoleConstruct} from "./constructs/github-role-construct";
import {IamRolePolicyAttachment} from "@cdktf/provider-aws/lib/iam-role-policy-attachment";

const {
  region
} = require("./variables.json");

export class CoreStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {region});

    const s3Construct = new S3Construct(this, "s3")

    const githubRoleConstruct = new GithubRoleConstruct(this, "github-role")

    new IamRolePolicyAttachment(this, "attach-policy", {
      policyArn: s3Construct.s3IamPolicy.arn,
      role: githubRoleConstruct.iamRole.name
    });
  }
}

const app = new App();
new CoreStack(app, "cdktf-terraform-github-actions-demo");
app.synth();
