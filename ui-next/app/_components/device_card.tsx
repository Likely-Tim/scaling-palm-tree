import { Button, Card, Flex, Icon, Mark, Text } from "@chakra-ui/react";
import { capitalizeFirstCharacter } from "../utils/text_utils";
import { DeviceCardProps } from "../_models/device_card_props";
import { CiSun } from "react-icons/ci";
import { MdOutlineSensors } from "react-icons/md";
import { RxSwitch } from "react-icons/rx";
import { TbCarFan, TbDeviceUnknown } from "react-icons/tb";

export default function DeviceCard(props: DeviceCardProps) {
  return (
    <Card.Root padding={"10px"} minWidth={"200px"}>
      <Card.Header>
        <Flex gap="2" alignItems="center">
          <Icon size="md">{getDomainIcon(props.domain)}</Icon>
          <Text>{capitalizeFirstCharacter(props.domain)}</Text>
        </Flex>
      </Card.Header>
      <Card.Body margin={"3px"}>
        <Text>
          <Mark variant="text">Name: </Mark>
          {props.friendlyName}
        </Text>
        <Text>
          <Mark variant="text">ID: </Mark>
          {props.entityId}
        </Text>
        <Text>
          <Mark variant="text">Current state: </Mark>
          {props.state}
        </Text>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" margin={"12px"}>
        <Button padding={"8px"}>Register</Button>
      </Card.Footer>
    </Card.Root>
  );
}

function getDomainIcon(domain: string) {
  switch (domain) {
    case "sensor":
      return <MdOutlineSensors />;
    case "sun":
      return <CiSun />;
    case "fan":
      return <TbCarFan />;
    case "switch":
      return <RxSwitch />;
    default:
      return <TbDeviceUnknown />;
  }
}
