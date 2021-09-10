const fs = require("fs-extra");
const path = require("path");
const { renderCopy } = require("./renderCopy");

const copyConfigFiles = async (
	baseoutput,
	dbconfig,
	withRest,
	withGraphql,
	projName
) => {
	const baseConfigfilesPath = path.join(__dirname, "/files/configfiles");
	await copyOrmconfigFile(baseoutput, dbconfig);
	await copyTsConfigFile(baseoutput);
	await copyPackageJsonFile(
		baseoutput,
		dbconfig.type,
		withRest,
		withGraphql,
		projName
	);
	await fs.copyFile(
		path.join(baseConfigfilesPath, "/Dockerfile"),
		path.join(baseoutput, "/Dockerfile")
	);
	await fs.copyFile(
		path.join(baseConfigfilesPath, "/.gitignore"),
		path.join(baseoutput, "/.gitignore")
	);
	await fs.copyFile(
		path.join(baseConfigfilesPath, "/.env"),
		path.join(baseoutput, "/.env")
	);
	await fs.copyFile(
		path.join(baseConfigfilesPath, "/.dockerignore"),
		path.join(baseoutput, "/.dockerignore")
	);
};

const copyOrmconfigFile = (outputPath, dbconfig) => {
	return renderCopy(
		path.join(__dirname, "/files/configfiles/ormconfig.template"),
		dbconfig,
		path.join(outputPath, "/ormconfig.json")
	);
};

const copyTsConfigFile = (outputPath) => {
	return fs.copyFile(
		path.join(__dirname, "/files/configfiles/typescript.json"),
		path.join(outputPath, "/tsconfig.json")
	);
};

const copyPackageJsonFile = async (
	outputPath,
	dbtype,
	withRest,
	withGraphql,
	projName
) => {
	const databaseMap = {
		postgres: "pg",
		mysql: "mysql",
		mariadb: "mysql",
		sqlite: "sqlite3",
		mssql: "mssql",
		oracle: "oracledb",
	};
	const database = databaseMap[dbtype];
	if (!database) throw new Error("unknown database type");

	await renderCopy(
		path.join(__dirname, "/files/configfiles/package.template"),
		{
			database,
			withRest,
			withGraphql,
			projName,
		},
		path.join(outputPath, "/package.json")
	);
};
exports.copyConfigFiles = copyConfigFiles;
