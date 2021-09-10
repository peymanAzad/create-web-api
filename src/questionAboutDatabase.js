const inq = require("inquirer");
const { questionInput } = require("./questionInput");

const questionAboutDatabase = async () => {
	const { databaseType } = await inq.prompt({
		type: "list",
		message: "pick your database type",
		name: "databaseType",
		choices: ["postgres", "mysql", "mariadb", "sqlite", "mssql", "oracle"],
	});

	const { databaseHost } = await questionInput(
		"databaseHost",
		"database host?",
		"localhost"
	);

	const { databasePort } = await inq.prompt({
		type: "number",
		name: "databasePort",
		message: "database port",
		default: 5432,
	});
	const { databaseName } = await questionInput(
		"databaseName",
		"database name?"
	);
	const { databaseUser } = await questionInput(
		"databaseUser",
		"database username?",
		"postgres"
	);
	const { databasePass } = await questionInput(
		"databasePass",
		"database password"
	);

	return {
		type: databaseType,
		host: databaseHost,
		port: databasePort,
		database: databaseName,
		username: databaseUser,
		password: databasePass,
	};
};
exports.questionAboutDatabase = questionAboutDatabase;
