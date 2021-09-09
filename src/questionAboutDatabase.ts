import inq from "inquirer";
import { questionInput } from "./questionInput";

export const questionAboutDatabase = async () => {
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
		type: databaseType as string,
		host: databaseHost as string,
		port: databasePort as string,
		database: databaseName as string,
		username: databaseUser as string,
		password: databasePass as string,
	};
};
