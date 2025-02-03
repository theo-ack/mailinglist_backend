import { readFile } from "fs/promises";

const DB_PATH = "store/db.json";

type Subscriber = {
  id: number;
  name: string;
  lastname: string;
  mail: string;
};

type DbData = {
  newsletter: string;
  subscribers: Subscriber[];
};

async function readFromDb() {
  const dataString = (await readFile(DB_PATH)).toString();
  const parsedData: DbData = JSON.parse(dataString);
  return parsedData;
}

(async () => {
  const dbdata = await readFromDb();
  console.log(dbdata.newsletter);
})();
