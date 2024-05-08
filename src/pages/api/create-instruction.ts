import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/create-instruction:
 *   patch:
 *     responses:
 *       200:
 *         description: Instruction created successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { instructor_id, subject_id, price, type, description, grade } = req.body;

    const grades = grade.map((g: { label: string; value: string; }) => g.value);

    await query(
      `INSERT INTO instructions (instructor_id, subject_id, price, type, description, grade) VALUES ($1, $2, $3, $4, $5, $6)`,
      [instructor_id, subject_id, price, type, description, grades]
    );

    res.status(200).json({ message: "Instruction created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
