import type { Mode } from "../../types";
import { useMemo, useState } from "react";
import { useSortedDirect } from "../../hooks";
import { getCurUser } from "../../function";

import ReadMe from "../Home/ReadMe";
import ResetButton from "../Home/Reset";
import Conversation from "../Conversation";
import Example from "../Example";
import NavBar from "../NavBar";
import Upload from "../Upload";

export default function Main() {
	const [mode, setMode] = useState<Mode>("home");
	const [file, setFile] = useState<File | null>(null);

	const conversations = useSortedDirect(file);
	const curUser = useMemo(() => getCurUser(conversations), [conversations]);

	return (
		<div className="flex flex-col items-center space-y-12 text-white font-nanum">
			<NavBar mode={mode} setMode={setMode} />
			{mode === "home" && (
				<div className="flex flex-col space-y-12 pb-24">
					<ReadMe />
					<ResetButton />
				</div>
			)}

			{mode === "example" && <Example />}

			{mode === "conversation" && (
				<>
					<Upload file={file} setFile={setFile} conversations={conversations} />
					{conversations && (
						<Conversation curUser={curUser} conversations={conversations} />
					)}
				</>
			)}
		</div>
	);
}
