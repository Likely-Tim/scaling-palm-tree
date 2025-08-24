import { State } from "../_models/state";
import { getDomain } from "../utils/state_utils";

class ServerClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getStates(): Promise<State[]> {
    const states = (await this.getCall("/states")) as State[];
    states.forEach((state) => getDomain(state));
    return states;
  }

  private async getCall(url: string) {
    const targetUrl = `${this.endpoint}${url}`;
    console.log(`Calling ${targetUrl}`);

    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Error response code: ${response.status}`);
    }
    return await response.json();
  }
}

const serverClient = new ServerClient("http://192.168.1.37:8000/api");

export default serverClient;
