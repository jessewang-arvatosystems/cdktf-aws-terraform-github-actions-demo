// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import {Construct} from "constructs";
import {App, S3Backend, TerraformStack} from "cdktf";
import {AwsProvider} from "@cdktf/provider-aws/lib/provider";
import {VPCConstruct} from "./constructs/vpc";

const pipelineVars = require("../ci-cd-pipeline/variables.json");
const {
  region
} = require("./variables.json");

export class MainStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {region});

    new VPCConstruct(this, "vpc-demo");
  }
}

const app = new App();
const mainStack = new MainStack(app, "main");

new S3Backend(mainStack, {
  bucket: pipelineVars.s3.bucket,
  encrypt: true,
  region: pipelineVars.region,
  key: `${pipelineVars.s3.terraformFolder}terraform.tfstate`
})

app.synth();
