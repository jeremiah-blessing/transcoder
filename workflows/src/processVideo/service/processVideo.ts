import { Ffmpeg } from './ffmpeg';
import { FileSystem } from './filesystem';
import { S3 } from './s3';

export class ProcessVideo {
  fileSystem: FileSystem;
  s3: S3;
  uploadId: string;

  constructor(uploadId: string) {
    this.fileSystem = new FileSystem(uploadId);
    this.s3 = new S3(uploadId, this.fileSystem.createReadStream, (fileName) =>
      this.fileSystem.createWriteStream(fileName, this.fileSystem.workingDir)
    );
    this.uploadId = uploadId;
  }

  async setup() {
    await this.fileSystem.setup();
    await this.s3.downloadOriginalFile();
  }

  async process() {
    await Ffmpeg.createFfmpegHLSStream(
      this.fileSystem.originalFile,
      this.fileSystem.outputDirAbsolutePath
    );
  }

  async upload() {
    await this.s3.uploadProcessedFiles(
      await this.fileSystem.getAllArtifactFiles()
    );
  }

  async cleanup() {
    await this.fileSystem.cleanup();
    await this.s3.deleteFile(this.uploadId);
  }
}
