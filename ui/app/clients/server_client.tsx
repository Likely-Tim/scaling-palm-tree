import type { State } from '~/models/State';
import Cookies from 'js-cookie';

class ServerClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getStates(): Promise<State[]> {
    return (await this.getCall('/states')) as State[];
  }

  async registerDevice(entityId: string, friendlyName: string) {
    return await this.postCall('/register', {
      entity_id: entityId,
      friendly_name: friendlyName
    });
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

  private async postCall(url: string, data: { [key: string]: string }) {
    let csrfToken = Cookies.get('csrftoken');
    if (csrfToken == undefined) {
      await this.getCsrfToken();
      csrfToken = Cookies.get('csrftoken') || '';
    }
    const targetUrl = `${this.endpoint}${url}/`;
    console.log(`Calling ${targetUrl}`);

    console.log(csrfToken);
    const response = await fetch(targetUrl, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error response code: ${response.status}`);
    }
    return await response.json();
  }

  private async getCsrfToken() {
    console.log('Getting CSRF Token.');
    await fetch(`${this.endpoint}/csrf`, {
      method: 'GET',
      credentials: 'include'
    });
  }
}

const serverClient = new ServerClient('http://192.168.1.62:8000/api');

export default serverClient;
