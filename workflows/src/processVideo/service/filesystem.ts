import fsSync, { promises as fs } from 'fs';
import path from 'path';

export type GetReadStream = (
  absolutePath: string
) => Promise<fsSync.ReadStream>;
export type GetWriteStream = (fileName: string) => Promise<fsSync.WriteStream>;

export class FileSystem {
  workingDir: string;
  outputDir: string;
  uploadId: string;
  originalFile: string;
  outputDirAbsolutePath: string;

  constructor(uploadId: string, outputDir?: string) {
    const workingRootDir = path.join(process.cwd() + '/tmp');
    this.workingDir = path.join(workingRootDir, uploadId);
    this.originalFile = path.join(this.workingDir, uploadId);
    this.outputDir = outputDir || 'output';
    this.uploadId = uploadId;
    this.outputDirAbsolutePath = path.join(this.workingDir, this.outputDir);
  }

  async setup() {
    const folderExists = await fs
      .access(this.workingDir)
      .then(() => true)
      .catch(() => false);

    if (folderExists) {
      await fs.rm(this.workingDir, { recursive: true, force: true });
    }

    await fs.mkdir(this.workingDir, { recursive: true });
    await fs.mkdir(this.outputDirAbsolutePath, {
      recursive: true,
    });
  }

  async getAllArtifactFiles() {
    const listDir = async (dirPath: string): Promise<string[]> => {
      const files = await fs.readdir(dirPath);
      const filePaths: string[] = [];

      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          filePaths.push(...(await listDir(fullPath)));
        } else {
          filePaths.push(path.resolve(fullPath));
        }
      }

      return filePaths;
    };

    const listOfFiles = await listDir(this.outputDirAbsolutePath);

    return listOfFiles.map((file) => ({
      absolutePath: file,
      // TODO: Fix this with video id
      relativePath:
        this.uploadId + file.replace(this.outputDirAbsolutePath, ''),
    }));
  }

  async createReadStream(absolutePath: string) {
    return fsSync.createReadStream(absolutePath);
  }

  async createWriteStream(fileName: string, workingDir: string) {
    return fsSync.createWriteStream(path.join(workingDir, fileName));
  }

  async cleanup() {
    await fs.rm(this.workingDir, { recursive: true, force: true });
  }
}
