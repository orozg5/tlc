import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/add-folder:
 *   post:
 *     responses:
 *       200:
 *         description: Folder added successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { instructor_id, folder_name, folder_path } = req.body;

    await query(`INSERT INTO folders (instructor_id, folder_name, folder_path) VALUES ($1, $2, $3)`, [
      instructor_id,
      folder_name,
      folder_path,
    ]);

    res.status(200).json({ message: "Folder added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
