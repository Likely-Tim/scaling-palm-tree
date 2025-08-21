import { redirect } from 'react-router';
import type { Route } from '../+types/root';

export async function loader({ request }: Route.LoaderArgs) {
  throw redirect('/overview');
}

export default function Redirect() {
  return;
}
