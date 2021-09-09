import path from "path";
import { copyDirWithFiles } from "./copyDirWithFiles";

export const copyGraphqlFiles = async (baseOutputPath: string) => {
	const filesPath = path.join(__dirname, "/files/src/host/graphql");
	const outputPath = path.join(baseOutputPath, "/src/host/graphql");

	await copyDirWithFiles(
		path.join(filesPath),
		path.join(outputPath),
		"index.ts",
		"types.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "inputTypes"),
		path.join(outputPath, "inputTypes"),
		"userInput.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "middlewars"),
		path.join(outputPath, "middlewars"),
		"isAuth.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "outputTypes"),
		path.join(outputPath, "outputTypes"),
		"baseResponse.ts",
		"userResponse.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "resolvers"),
		path.join(outputPath, "resolvers"),
		"userResolver.ts"
	);

	await copyDirWithFiles(
		path.join(filesPath, "tools"),
		path.join(outputPath, "tools"),
		"errorMap.ts",
		"validator.ts"
	);
};
