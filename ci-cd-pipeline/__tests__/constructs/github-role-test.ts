import "cdktf/lib/testing/adapters/jest";
import {Testing} from "cdktf";
import {GithubRoleConstruct} from "../../constructs/github-role";
import {IamRole} from "@cdktf/provider-aws/lib/iam-role";
import {IamOpenidConnectProvider} from "@cdktf/provider-aws/lib/iam-openid-connect-provider";

const {
    githubRole: {
        name
    }
} = require("../../variables.json");
const {OPEN_ID} = require("../../constants.json")

describe("GitHub Role", () => {

    let expectObj : jest.JestMatchers<String>;
    beforeAll(() => {
        expectObj = expect(
            Testing.synthScope((scope) => {
                new GithubRoleConstruct(scope, "github-construct-test");
            })
        );
    });

    it("open id provider exists", () => {
        expectObj.toHaveResourceWithProperties(IamOpenidConnectProvider, {
            url: OPEN_ID.TOKEN_GITHUB_URL,
            client_id_list: [OPEN_ID.CLIENT_ID],
            thumbprint_list: [OPEN_ID.THUMBPRINT]
        });
    });

    it("should exist", () => {
        expectObj.toHaveResourceWithProperties(IamRole, {name});
    });

});
