import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/edit-share-material:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully edited the materials-students.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, date } = req.body;

    await query("UPDATE materials_students SET expiry_date = $2 WHERE id = $1", [id, new Date(date)]);

    res.status(200).json({ message: "Successfully edited the materials-students." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
