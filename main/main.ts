// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import {Construct} from "constructs";
import {App, TerraformStack} from "cdktf";
import {AwsProvider} from "@cdktf/provider-aws/lib/provider";

const {
  region
} = require("./variables.json");

export class MainStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {region});

  }
}

const app = new App();
new MainStack(app, "main");
app.synth();
