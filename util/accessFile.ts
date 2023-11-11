import * as FileSystem from "expo-file-system";

type WriteFileProps = {
  fileName: string;
  fileContents?: string;
};

const writeFile = async ({ fileName, fileContents }: WriteFileProps) => {
  const path = FileSystem.documentDirectory + fileName;

  await FileSystem.writeAsStringAsync(path, fileContents)
    .then(() => console.log("Successfully Updated", fileName))
    .catch((err) => console.log(err.message));
};

const readFile = async ({
  fileName,
}: WriteFileProps): Promise<string | undefined> => {
  const path = FileSystem.documentDirectory + fileName;
  let result = undefined;
  await FileSystem.readAsStringAsync(path)
    .then((file) => {
      console.log("Successfully Read", fileName);
      result = file;
    })
    .catch((err) => console.log(err.message));

  return result;
};

export { readFile, writeFile };
