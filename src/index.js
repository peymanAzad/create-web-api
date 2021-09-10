#!/usr/bin/env node
const inq = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { assert } = require("console");
const chalk = require("chalk");
const { questionAboutDatabase } = require("./questionAboutDatabase");
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
	const dbconfig = await questionAboutDatabase(projectName);

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

	displaySuccesMessage(projectName, baseOutputPath);
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

const displaySuccesMessage = (projName, outputPath) => {
	console.log(
		`${chalk.green(
			"Seccess!"
		)} created ${projName} at ${outputPath}\nInside that directory run ${chalk.blue(
			"'yarn' or 'npm i'"
		)} for installing dependencies.\nThen you can run these commands:\n${chalk.blue(
			"'yarn build' or 'npm run build'"
		)}\n\tfor building typescript\n${chalk.blue(
			"'yarn watch' or 'npm run watch'"
		)}\n\tfor building and watching typescript files for changes\n${chalk.blue(
			"'yarn start' or 'npm run start'"
		)}\n\tfor starting project\n${chalk.blue(
			"'yarn startd' or 'npm run startd'"
		)}\n\tfor starting project with nodemon\n${chalk.blue(
			"'yarn debug' or 'npm run debug'"
		)}\n\tfor debuging\n${chalk.blue(
			"'yarn create:migration' or 'npm run create:migration'"
		)}\n\tfor creating migrations\nDon't forget to create database before running project\n${chalk.green(
			"created with love!"
		)}\n${chalk.green("happy coding!")}`
	);
};

main();
