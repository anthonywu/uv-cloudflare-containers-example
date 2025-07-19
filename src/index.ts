import { Container, getRandom } from "@cloudflare/containers";

const INSTANCE_COUNT = 1;

export class Backend extends Container {
  defaultPort = 30000; // match Dockerfile EXPOSE and CMD arg
  sleepAfter = "10m";
  envVars = {
    CONFIG_1: this.env.CONFIG_1, // defined in wrangler.jsonc
    SECRET_1: this.env.SECRET_1 // wrangler secret put SECRET_1
  };
}

export default {
  async fetch(
    request: Request,
    env: { BACKEND: DurableObjectNamespace<Backend> },
  ): Promise<Response> {
    const containerInstance = await getRandom(env.BACKEND, INSTANCE_COUNT);
    return containerInstance.fetch(request);
  },
};
