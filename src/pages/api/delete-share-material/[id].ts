import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/delete-share-material/[id]:
 *   delete:
 *     responses:
 *       200:
 *         description: Successfully unshared the material.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    await query("DELETE FROM materials_students WHERE id = $1", [id]);

    res.status(200).json({ message: "Successfully unshared the material." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
