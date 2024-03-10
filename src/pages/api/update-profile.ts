import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/update-profile:
 *   patch:
 *     responses:
 *       200:
 *         description: User updated in successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      id,
      role,
      first_name,
      last_name,
      gender,
      date_of_birth,
      school,
      grade,
      city_id,
      phone,
      profile_photo,
      educational_attainment,
      finished_school,
      description,
    } = req.body;

    const birth = new Date(date_of_birth);

    if (role == "student") {
      await query(
        "UPDATE students SET first_name = $2, last_name = $3, gender = $4, date_of_birth = $5, school = $6, grade = $7, city_id = $8, phone = $9, profile_photo = $10 WHERE user_id = $1",
        [id, first_name, last_name, gender, birth, school, grade, city_id || "a48c7777-26c8-447b-a976-476aa81e0ddc", phone, profile_photo]
      );
    } else {
      await query(
        "UPDATE instructors SET first_name = $2, last_name = $3, gender = $4, date_of_birth = $5, educational_attainment = $6, finished_school = $7, city_id = $8, phone = $9, profile_photo = $10, description = $11 WHERE user_id = $1",
        [
          id,
          first_name,
          last_name,
          gender,
          birth,
          educational_attainment,
          finished_school,
          city_id || "a48c7777-26c8-447b-a976-476aa81e0ddc",
          phone,
          profile_photo,
          description,
        ]
      );
    }

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
