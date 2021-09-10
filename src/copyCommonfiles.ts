import path from "path";
import fs, { copy, ensureDir } from "fs-extra";
import { renderCopy } from "./renderCopy";

export const copyCommonFiles = async (
	outputPath: string,
	withGraphql: boolean,
	withRest: boolean
) => {
	const filesPath = path.join(__dirname, "/files");
	await ensureDir(path.join(outputPath, "/src"));
	await ensureDir(path.join(outputPath, "/src/entities"));

	await renderCopy(
		path.join(filesPath, "/src/entities/User.template"),
		{
			withgraphql: withGraphql,
		},
		path.join(outputPath, "/src/entities/User.ts")
	);

	await fs.copyFile(
		path.join(filesPath, "/src/index.ts"),
		path.join(outputPath, "/src/index.ts")
	);

	await ensureDir(path.join(outputPath, "/src/dataAccess"));
	await ensureDir(path.join(outputPath, "/src/dataAccess/migrations"));

	await copy(
		path.join(filesPath, "/src/dataAccess/repositories"),
		path.join(outputPath, "/src/dataAccess/repositories")
	);

	await copy(
		path.join(filesPath, "/src/services"),
		path.join(outputPath, "/src/services")
	);

	await copy(
		path.join(filesPath, "/src/services.contracts"),
		path.join(outputPath, "/src/services.contracts")
	);

	await ensureDir(path.join(outputPath, "/src/host"));
	const appHost = "/src/host/app.ts";
	await renderCopy(
		path.join(filesPath, "/src/host/app.template"),
		{ withGraphql, withRest },
		path.join(outputPath, appHost)
	);

	await copy(
		path.join(filesPath, "/src/host/auth"),
		path.join(outputPath, "/src/host/auth")
	);
};
