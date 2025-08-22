import serverClient from '~/clients/server_client';
import { Page } from '~/components/page';
import {
  Card,
  Container,
  Flex,
  For,
  Icon,
  Mark,
  Select,
  Text,
  createListCollection
} from '@chakra-ui/react';
import type { Route } from './+types/devices';
import { MdOutlineSensors } from 'react-icons/md';
import { TbCarFan, TbDeviceUnknown } from 'react-icons/tb';
import { CiSun } from 'react-icons/ci';
import { RxSwitch } from 'react-icons/rx';
import { capitalizeFirstCharacter } from '~/utils/text_utils';
import { useState } from 'react';
import type { State } from '~/models/State';

interface EnrichedState extends State {
  domain: string;
}

export async function loader({ params }: Route.LoaderArgs) {
  const states = await serverClient.getStates();
  return { states };
}

export default function Devices({ loaderData }: Route.ComponentProps) {
  const { states } = loaderData;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const enrichedStates = enrichStates(states);

  return (
    <Container>
      <Page title="Devices" />
      {getSelect(enrichedStates, setSelectedValue)}
      {getCards(enrichedStates, selectedValue)}
    </Container>
  );
}

function getDomainIcon(domain: string) {
  switch (domain) {
    case 'sensor':
      return <MdOutlineSensors />;
    case 'sun':
      return <CiSun />;
    case 'fan':
      return <TbCarFan />;
    case 'switch':
      return <RxSwitch />;
    default:
      return <TbDeviceUnknown />;
  }
}

function enrichStates(states: State[]): EnrichedState[] {
  const enrichedStates = states.map(state => {
    const domain = state.entity_id.split('.').at(0);
    return {
      ...state,
      domain: domain ? domain : 'Unknown'
    };
  });
  return enrichedStates.sort((a, b) => a.domain.localeCompare(b.domain));
}

function getListCollection(enrichedStates: EnrichedState[]) {
  const domainTypes = [...new Set(enrichedStates.map(states => states.domain))];
  const selectValues = domainTypes.map(domainType => {
    return {
      label: capitalizeFirstCharacter(domainType),
      value: domainType
    };
  });
  return createListCollection({ items: selectValues });
}

function getSelect(states: EnrichedState[], setSelectedValue: (value: string | undefined) => void) {
  const listSelection = getListCollection(states);
  return (
    <Select.Root
      collection={listSelection}
      onValueChange={details => setSelectedValue(details.value.at(0))}
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
          {listSelection.items.map(selectCollection => (
            <Select.Item item={selectCollection} key={selectCollection.value}>
              {selectCollection.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}

function getCards(states: EnrichedState[], selectedValue: string | undefined) {
  return (
    <Flex flexWrap="wrap" gap="3" justifyContent="space-between">
      <For each={states.filter(state => selectedValue == null || state.domain == selectedValue)}>
        {state => {
          return (
            <Card.Root>
              <Card.Header>
                <Flex gap="2" alignItems="center">
                  <Icon size="md">{getDomainIcon(state.domain)}</Icon>
                  <Text>{capitalizeFirstCharacter(state.domain)}</Text>
                </Flex>
              </Card.Header>
              <Card.Body>
                <Text>
                  <Mark variant="text">Name: </Mark>
                  {state.attributes.friendly_name}
                </Text>
                <Text>
                  <Mark variant="text">ID: </Mark>
                  {state.entity_id}
                </Text>
                <Text>
                  <Mark variant="text">Current state: </Mark>
                  {state.state}
                </Text>
              </Card.Body>
              <Card.Footer />
            </Card.Root>
          );
        }}
      </For>
    </Flex>
  );
}
