import { questionAboutDatabase } from "./questionAboutDatabase";
import inq from "inquirer";
import fs from "fs-extra";
import path from "path";
import { assert } from "console";
import { questionInput } from "./questionInput";
import { copyCommonFiles } from "./copyCommonfiles";
import { copyGraphqlFiles } from "./copyGraphqlFiles";
import { copyRestFiles } from "./copyRestFiles";
import { copyConfigFiles } from "./copyConfigFiles";

export interface DBConfig {
	type: string;
	host: string;
	port: string;
	database: string;
	username: string;
	password: string;
}

const main = async () => {
	const projectName = process.argv[2]
		? process.argv[2]
		: await questionProjectName();
	assert(projectName, "project name is not specified");
	const baseOutputPath = path.join(process.cwd(), "/" + projectName);

	const { withGraphql, withRest } = await questionApiTypes();
	const dbconfig: DBConfig = await questionAboutDatabase();

	await fs.ensureDir(baseOutputPath);

	await copyConfigFiles(
		baseOutputPath,
		dbconfig,
		withRest,
		withGraphql,
		projectName
	);
	await copyCommonFiles(baseOutputPath, withGraphql, withRest);
	if (withGraphql) await copyGraphqlFiles(baseOutputPath);
	if (withRest) await copyRestFiles(baseOutputPath);
};

const questionProjectName = async () => {
	const { projectName } = await questionInput(
		"projectName",
		"project name?",
		"my-api"
	);
	return projectName as string;
};

const questionApiTypes = async () => {
	const { apitypes }: { apitypes: string[] } = await inq.prompt({
		type: "checkbox",
		message: "select APIs you need",
		name: "apitypes",
		choices: ["REST", "GraphQL"],
	});
	return {
		withRest: apitypes.includes("REST"),
		withGraphql: apitypes.includes("GraphQL"),
	};
};

main();
