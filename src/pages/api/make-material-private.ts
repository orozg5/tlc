import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/make-material-private:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully made the material private.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { materialId } = req.body;

    await query("UPDATE materials SET is_public = $2 WHERE material_id = $1", [materialId, false]);

    res.status(200).json({ message: "Successfully made the material private." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
