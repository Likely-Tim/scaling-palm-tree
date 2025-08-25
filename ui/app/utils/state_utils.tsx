import { State } from '../_models/state';

export function getDomain(state: State) {
    state.domain = state.entity_id.split('.').at(0) || 'Unknown Domain';
}

export function sortStates(states: State[]) {
    states.sort((a, b) => (a.domain || '').localeCompare(b.domain || ''));
}
