"use client";

import {
  Container,
  createListCollection,
  Flex,
  Select,
} from "@chakra-ui/react";
import DeviceCard from "../_components/device_card";
import { State } from "../_models/state";
import { useState } from "react";
import { capitalizeFirstCharacter } from "../utils/text_utils";

interface DevicesPageProps {
  states: State[];
}

export default function DevicesPage(props: DevicesPageProps) {
  const [domainSelected, setDomainSelected] = useState<string | undefined>(
    undefined
  );
  const listSelection = getListCollection(props.states);

  return (
    <Container>
      <Select.Root
        collection={listSelection}
        onValueChange={(details) => setDomainSelected(details.value.at(0))}
        marginBottom="15px"
        width="200px"
      >
        <Select.HiddenSelect />
        <Select.Label>Filter By Domain:</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {listSelection.items.map((selectCollection) => (
              <Select.Item item={selectCollection} key={selectCollection.value}>
                {selectCollection.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <Flex flexWrap="wrap" gap="3" justifyContent="space-between">
        {props.states
          .filter(
            (state) =>
              domainSelected == undefined || domainSelected == state.domain
          )
          .map((state) => {
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

function getListCollection(enrichedStates: State[]) {
  const domainTypes = [
    ...new Set(enrichedStates.map((states) => states.domain)),
  ];
  const selectValues = domainTypes.map((domainType) => {
    return {
      label: capitalizeFirstCharacter(domainType),
      value: domainType,
    };
  });
  return createListCollection({ items: selectValues });
}
