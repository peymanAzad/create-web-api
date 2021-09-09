import fs from "fs-extra";
import Mustache from "mustache";
import path from "path";
import { prettyfyAndSave } from "./prettyfyAndSave";

export const doPackageJsonStuff = async (
	outputPath: string,
	dbtype: string,
	withRest: boolean,
	withGraphql: boolean
) => {
	const packageFile = await fs.readFile(
		path.join(__dirname, "/files/configfiles/package.template"),
		"utf8"
	);
	const databaseMap: Record<string, string> = {
		postgres: "pg",
		mysql: "mysql",
		mariadb: "mysql",
		sqlite: "sqlite3",
		mssql: "mssql",
		oracle: "oracledb",
	};
	const database = databaseMap[dbtype];
	if (!database) throw new Error("unknown database type");
	const packagejson = Mustache.render(packageFile, {
		database,
		withRest,
		withGraphql,
	});

	await prettyfyAndSave(
		packagejson,
		path.join(outputPath, "/package.json"),
		"json"
	);
};
