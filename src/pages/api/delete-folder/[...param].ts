import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { supabase } from "@/lib/supabase";

/**
 * @swagger
 * /api/delete-folder/[path]/[name]:
 *   delete:
 *     responses:
 *       200:
 *         description: Successfully deleted the folder.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { param } = req.query;
    if (param) {
      let path = param[0].split("***").join("/");
      let name = param[1];
      let id = param[2];

      await query("DELETE FROM folders WHERE folder_id = $1", [id]);
      await query("DELETE FROM folders WHERE folder_path LIKE $1", [path + name + "/"]);

      const materialsToDelete = await query("SELECT material_id, file_url FROM materials WHERE path LIKE $1", [
        path + name + "/",
      ]);
      for (let m of materialsToDelete.rows) {
        await supabase.storage.from("files").remove([m.file_url]);
      }
      await query("DELETE FROM materials WHERE path LIKE $1", [path + name + "/"]);

      res.status(200).json({ message: "Successfully deleted the folder." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
