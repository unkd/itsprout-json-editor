import express from "express";
import cors from "cors";
import { google } from "googleapis";

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: "./json/googlekey.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const getFolderName = async (folderId) => {
  const drive = google.drive({ version: "v3", auth });

  const response = await drive.files.get({
    fileId: folderId,
    fields: "name",
  });

  return response.data.name;
};

const getPhotos = async (folderId) => {
  const drive = google.drive({ version: "v3", auth });
  const fileContent = await drive.files.list({
    q: `'${folderId}' in parents and (mimeType='image/svg+xml' or mimeType='image/png' or mimeType='image/jpeg')`,
    fields: "nextPageToken, files(id, name)",
  });

  return fileContent.data.files;
};

app.get("/google-drive", async (req, res) => {
  const query = req.query;

  const folders = await Promise.all(
    query["folder-id"].map(async (id) => {
      const folder = {};
      folder.name = await getFolderName(id);
      folder.images = await getPhotos(id);

      return folder;
    })
  );

  res.json(folders);
});

app.listen(10000, () => {
  console.log("Server is running.");
});
