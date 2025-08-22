import type { State } from '~/models/State';

class ServerClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getStates(): Promise<State[]> {
    return (await this.call('/states')) as State[];
  }

  private async call(url: string) {
    const targetUrl = `${this.endpoint}${url}`;
    console.log(`Calling ${targetUrl}`);
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Error response code: ${response.status}`);
    }
    return await response.json();
  }
}

const serverClient = new ServerClient('http://192.168.1.62:8000/api');

export default serverClient;
