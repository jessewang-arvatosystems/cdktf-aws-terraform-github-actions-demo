// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import {Construct} from "constructs";
import {App, TerraformStack} from "cdktf";
import {AwsProvider} from "@cdktf/provider-aws/lib/provider";
import {S3Construct} from "./constructs/s3";
import {GithubRoleConstruct} from "./constructs/github-role";
import {IamRolePolicyAttachment} from "@cdktf/provider-aws/lib/iam-role-policy-attachment";

const {
  region
} = require("./variables.json");

export class CI_CD_PipelineStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {region});

    const s3Construct = new S3Construct(this, "s3")

    const githubRoleConstruct = new GithubRoleConstruct(this, "github-role")

    // Enable Github Role to access to S3 Bucket
    new IamRolePolicyAttachment(this, "attach-policy", {
      policyArn: s3Construct.iamPolicy.arn,
      role: githubRoleConstruct.iamRole.name
    });
  }
}

const app = new App();
new CI_CD_PipelineStack(app, "ci-cd-pipeline");
app.synth();
