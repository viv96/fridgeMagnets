import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_1VfS3nECr",
  ClientId: "5hu3toql88iudpdp0m3gueiiao",
};

export default new CognitoUserPool(poolData);
