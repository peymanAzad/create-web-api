import { doPackageJsonStuff } from "./doPackageJsonStuff";
import fs from "fs-extra";
import path from "path";
import { DBConfig } from "./index";
import { renderCopy } from "./renderCopy";

export const copyConfigFiles = async (
	baseoutput: string,
	dbconfig: DBConfig,
	withRest: boolean,
	withGraphql: boolean
) => {
	const baseConfigfilesPath = path.join(__dirname, "/files/configfiles");
	await copyOrmconfigFile(baseoutput, dbconfig);
	await copyTsConfigFile(baseoutput);
	await doPackageJsonStuff(baseoutput, dbconfig.type, withRest, withGraphql);
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

const copyOrmconfigFile = (outputPath: string, dbconfig: DBConfig) => {
	return renderCopy(
		path.join(__dirname, "/files/configfiles/ormconfig.template"),
		dbconfig,
		path.join(outputPath, "/ormconfig.json"),
		"json"
	);
};

const copyTsConfigFile = (outputPath: string) => {
	return fs.copyFile(
		path.join(__dirname, "/files/configfiles/typescript.json"),
		path.join(outputPath, "/tsconfig.json")
	);
};
