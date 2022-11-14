import "cdktf/lib/testing/adapters/jest";
import {Testing} from "cdktf";
import {AdditionalPermissionsConstruct} from "../../constructs/additional-permissions";
import {IamPolicy} from "@cdktf/provider-aws/lib/iam-policy";

const {
    iam
} = require("../../variables.json");

describe("Additional Permissions", () => {

    let expectObj : jest.JestMatchers<String>;
    beforeAll(() => {
        expectObj = expect(
            Testing.synthScope((scope) => {
                new AdditionalPermissionsConstruct(scope, "additional-permissions-construct-test");
            })
        );
    });

    it("should exist", () => {
        expectObj.toHaveResourceWithProperties(IamPolicy, {name: iam.additionalPermissionsPolicyName});
    });

});
