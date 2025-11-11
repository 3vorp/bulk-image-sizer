#!/usr/bin/env node

import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { writeFile } from "node:fs/promises";

import { imageSizeFromFile } from "image-size/fromFile";

export default function walkSync(dir, filelist = []) {
	for (const file of readdirSync(dir)) {
		const path = join(dir, file);
		if (statSync(path).isDirectory()) filelist = walkSync(path, filelist);
		else filelist.push(path);
	}
	return filelist;
}


const dir = resolve(process.argv[2]);
const fileList = walkSync(dir).filter((f) => f.endsWith(".png"));

const sizes = await Promise.all(
	fileList.map(async (f) => ({
		filename: f,
		size: await imageSizeFromFile(f),
	})),
);

const removePath = join(dir, "assets", "minecraft", "textures");

const formatted = sizes
	.sort((a, b) => {
		const aMult = a.size.height * a.size.width;
		const bMult = b.size.height * b.size.width;
		return bMult - aMult;
	})
	.map(
		({ filename, size }) =>
			`[${size.width}x${size.height}]\t${filename.replace(removePath, "")}`,
	)
	.join("\n");

const resultPath = join(dir, "sized.txt");
await writeFile(resultPath, formatted);
console.log(`Written results to ${resultPath}!`);
