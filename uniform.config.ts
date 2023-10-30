import dotenv from "dotenv";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

export default async function getUniformConfig() {
  const ssm = new SSMClient({});

  const getSecret = async (atPath: string) => {
    const command = new GetParameterCommand({
      Name: atPath,
      WithDecryption: true,
    });

    const response = await ssm.send(command);

    if (!response.Parameter || !response.Parameter.Value) {
      throw new Error("failed to retrieve database password value");
    }

    return response.Parameter.Value;
  };

  const uniformApiKey = await getSecret(process.env.UNIFORM_API_KEY || "");
  const auth0Secret = await getSecret(process.env.AUTH0_SECRET || "");
  const aut0ClientSecret = await getSecret(
    process.env.AUTH0_CLIENT_SECRET || "",
  );
  const amazonS3BucketName = await getSecret(
    process.env.AMAZON_S3_BUCKET_NAME || "",
  );

  const defaults: Record<string, string> = {
    UNIFORM_API_KEY: uniformApiKey,
    AUTH0_SECRET: auth0Secret,
    AUTH0_CLIENT_SECRET: aut0ClientSecret,
    AMAZON_S3_BUCKET_NAME: amazonS3BucketName,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function processDefault(key: any, fallback: any) {
    if (!key) {
      return null;
    }
    process.env[key] = process.env[key] || fallback;
  }

  module.exports = function () {
    dotenv.config();
    Object.keys(defaults).forEach((k) => processDefault(k, defaults[k]));
  };
}
