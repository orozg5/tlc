import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/edit-folder:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully edited the folder.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { folderId, newFolderName, path, folderName } = req.body;

    await query("UPDATE folders SET folder_name = $2 WHERE folder_id = $1", [folderId, newFolderName]);

    let ids = await query("SELECT folder_id FROM folders WHERE folder_path LIKE $1", [path + folderName + "/"]);
    for (let id of ids.rows){
      let currentPath = await query("SELECT folder_path FROM folders WHERE folder_id = $1", [id.folder_id]);
      let newPath = path + newFolderName + currentPath.rows[0].folder_path.substring(path.length + folderName.length);
      await query("UPDATE folders SET folder_path = $2 WHERE folder_id = $1", [id.folder_id, newPath]);
    }

    let material_ids = await query("SELECT material_id FROM materials WHERE path LIKE $1", [path + folderName + "/"]);
    for (let id of material_ids.rows){
      let currentPath = await query("SELECT path FROM materials WHERE material_id = $1", [id.material_id]);
      let newPath = path + newFolderName + currentPath.rows[0].path.substring(path.length + folderName.length);
      await query("UPDATE materials SET path = $2 WHERE material_id = $1", [id.material_id, newPath]);
    }

    res.status(200).json({ message: "Successfully edited the folder." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
