import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/share-material:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully shared the material.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { materialId, shareMaterial } = req.body;

    shareMaterial?.map(async (s: { id: string; date: string }) => {
      await query("INSERT INTO materials_students (material_id, student_id, expiry_date) VALUES ($1, $2, $3)", [
        materialId,
        s.id,
        new Date(s.date),
      ]);
    });

    res.status(200).json({ message: "Successfully shared the material." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
