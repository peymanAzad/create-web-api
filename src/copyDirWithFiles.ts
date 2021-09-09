import { copy, ensureDir } from "fs-extra";
import path from "path";

export const copyDirWithFiles = async (
	dirPath: string,
	outPath: string,
	...files: string[]
) => {
	await ensureDir(outPath);
	for (let file of files) {
		await copy(path.join(dirPath, file), path.join(outPath, file));
	}
};
