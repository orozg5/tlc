import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/edit-instruction:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully edited the instruction.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { instruction_id, subject_id, grade, type, description, price } = req.body;

    await query(
      "UPDATE instructions SET subject_id = $2, grade = $3, type = $4, description = $5, price = $6 WHERE instruction_id = $1",
      [instruction_id, subject_id, grade, type, description, price]
    );

    res.status(200).json({ message: "Successfully edited the instruction." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
