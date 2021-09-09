import path from "path";
import { copyDirWithFiles } from "./copyDirWithFiles";

export const copyRestFiles = async (baseOutputPath: string) => {
	const filesPath = path.join(__dirname, "/files/src/host/restApi");
	const outputPath = path.join(baseOutputPath, "/src/host/restApi");

	await copyDirWithFiles(
		path.join(filesPath),
		path.join(outputPath),
		"index.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "routers"),
		path.join(outputPath, "routers"),
		"authRouter.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "schemas"),
		path.join(outputPath, "schemas"),
		"userSchema.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "tools"),
		path.join(outputPath, "tools"),
		"userMap.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "types"),
		path.join(outputPath, "types"),
		"errorResponse.ts",
		"userResponse.ts"
	);
};
