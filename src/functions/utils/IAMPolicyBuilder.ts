interface IPolicyBuilder {
  userId: string;
  effect: "Allow" | "Deny";
  methodArn;
}
export const IAMPolicyBuilder = ({ userId, effect, methodArn }: IPolicyBuilder) => {
  console.log({ methodArn });
  return {
    principalId: userId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: "*",
        },
      ],
    },
  };
};
