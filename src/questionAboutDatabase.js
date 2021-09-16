const inq = require("inquirer");
const { questionInput } = require("./questionInput");

const dbDefaultPorts = {
	postgres: 5432,
	mysql: 3306,
	mariadb: 3306,
	mssql: 1433,
	oracle: 1521,
};

const questionAboutDatabase = async (projName) => {
	const { databaseType } = await inq.prompt({
		type: "list",
		message: "pick your database type",
		name: "databaseType",
		choices: ["postgres", "mysql", "mariadb", "sqlite", "mssql", "oracle"],
	});

	const { databaseName } = await questionInput(
		"databaseName",
		databaseType !== "sqlite" ? "database name?" : "database path?",
		databaseType !== "sqlite" ? projName : `./${projName}.sql`
	);
	if (databaseType === "sqlite")
		return {
			type: databaseType,
			database: databaseName,
		};

	const { databaseHost } = await questionInput(
		"databaseHost",
		"database host?",
		"localhost"
	);

	const { databasePort } = await inq.prompt({
		type: "number",
		name: "databasePort",
		message: "database port",
		default: dbDefaultPorts[databaseType],
	});

	const { databaseUser } = await questionInput(
		"databaseUser",
		"database username?",
		databaseType
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
