export interface State {
  entity_id: string;
  state: string;
  attributes: Attributes;
  domain: string;
}

export interface Attributes {
  friendly_name: string;
}
