import { Metadata } from "next";
import serverClient from "../_clients/server_client";
import { sortStates } from "../utils/state_utils";
import DevicesPage from "./page_container";

export const metadata: Metadata = {
  title: "Device Management",
};

export default async function Page() {
  const states = await serverClient.getStates();
  sortStates(states);

  return <DevicesPage states={states} />;
}
