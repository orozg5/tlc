import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/edit-material:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully edited the material.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { materialId, newName } = req.body;

    await query(
      "UPDATE materials SET file_name = $2 WHERE material_id = $1",
      [materialId, newName]
    );

    res.status(200).json({ message: "Successfully edited the material." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
