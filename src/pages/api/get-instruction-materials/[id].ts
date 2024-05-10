import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-instruction-materials:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got instruction materials.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const materials = await query("SELECT * FROM materials WHERE instructor_id = $1 AND is_public = $2", [id, true]);

    res.status(200).json(materials.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
