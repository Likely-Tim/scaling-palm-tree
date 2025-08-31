
import { getUngroupedDevices } from "@/app/_actions/server_client_actions"
export default async function AddMemberDialog() {
	const ungroupedDevices = await getUngroupedDevices();
	console.log(ungroupedDevices);
	return (
		<>
		</>
	)
}
