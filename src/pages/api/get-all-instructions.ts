import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-all-instructions:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the instructions.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sqlQuery = `
      SELECT 
          instructions.instruction_id,
          instructions.instructor_id,
          instructions.subject_id,
          instructions.price,
          instructions.type,
          instructions.description,
          instructions.grade,
          i.first_name,
          i.last_name,
          i.gender,
          i.date_of_birth,
          i.city_id,
          i.phone,
          i.educational_attainment,
          i.finished_school,
          i.profile_photo,
          i.description AS instructorDescription,
          sc.subject_id,
          sc.subject_name,
          ROUND(AVG(ir.rating)) AS average_rating
      FROM 
          instructions
      LEFT JOIN
          instructors i ON instructions.instructor_id = i.user_id
      LEFT JOIN 
          instructor_ratings ir ON instructions.instructor_id = ir.instructor_id
      LEFT JOIN 
          subjects_catalog sc ON instructions.subject_id = sc.subject_id
      GROUP BY
          instructions.instruction_id,
          instructions.instructor_id,
          instructions.subject_id,
          instructions.price,
          instructions.type,
          instructions.description,
          instructions.grade,
          i.first_name,
          i.last_name,
          i.gender,
          i.date_of_birth,
          i.city_id,
          i.phone,
          i.educational_attainment,
          i.finished_school,
          i.profile_photo,
          i.description,
          sc.subject_id,
          sc.subject_name
      ORDER BY
          average_rating DESC, instructions.price;
    `;

    const instructions = await query(sqlQuery, []);

    res.status(200).json(instructions.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
