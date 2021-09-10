const { questionAboutDatabase } = require("./questionAboutDatabase");
const inq = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { assert } = require("console");
const { questionInput } = require("./questionInput");
const { copyCommonFiles } = require("./copyCommonfiles");
const { copyConfigFiles } = require("./copyConfigFiles");

const main = async () => {
	const projectName = process.argv[2]
		? process.argv[2]
		: await questionProjectName();
	assert(projectName, "project name is not specified");
	const baseOutputPath = path.join(process.cwd(), "/" + projectName);

	const { withGraphql, withRest } = await questionApiTypes();
	const dbconfig = await questionAboutDatabase();

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
	return projectName;
};

const questionApiTypes = async () => {
	const { apitypes } = await inq.prompt({
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

const copyGraphqlFiles = async (baseOutputPath) => {
	const filesPath = path.join(__dirname, "/files/src/host/graphql");
	const outputPath = path.join(baseOutputPath, "/src/host/graphql");

	await fs.copy(filesPath, outputPath);
};

const copyRestFiles = async (baseOutputPath) => {
	const filesPath = path.join(__dirname, "/files/src/host/restApi");
	const outputPath = path.join(baseOutputPath, "/src/host/restApi");

	await fs.copy(filesPath, outputPath);
};

main();
