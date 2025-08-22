export interface State {
  entity_id: string;
  state: string;
  attributes: Attributes;
}

export interface Attributes {
  friendly_name: string;
}
