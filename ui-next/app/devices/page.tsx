import { Container, Flex, Text } from "@chakra-ui/react";
import serverClient from "../_clients/server_client";
import DeviceCard from "../_components/device_card";
import { sortStates } from "../utils/state_utils";

export default async function Page() {
  const states = await serverClient.getStates();
  sortStates(states);

  return (
    <Container>
      <Flex flexWrap="wrap" gap="3" justifyContent="space-between">
        {states.map((state) => {
          return (
            <DeviceCard
              key={state.entity_id}
              domain={state.domain}
              friendlyName={state.attributes.friendly_name}
              entityId={state.entity_id}
              state={state.state}
            />
          );
        })}
      </Flex>
    </Container>
  );
}
