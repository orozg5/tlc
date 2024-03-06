import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-current-user-info:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current user info.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const userData = await getMe(req);
    const id = userData?.id;

    let data;
    if (userData?.role == "student") {
      data = await query("SELECT * FROM students WHERE user_id = $1", [id]);
    } else {
      data = await query("SELECT * FROM instructors WHERE user_id = $1", [id]);
    }

    let user = {
      id: id,
      role: userData?.role,
      email: userData?.email,
      first_name: data.rows[0].first_name,  
      last_name: data.rows[0].last_name,  
      gender: data.rows[0].gender,
      date_of_birth: data.rows[0].date_of_birth,
      address: data.rows[0].address,
      phone: data.rows[0].phone,
      profile_photo: data.rows[0].profile_photo,
      school: "",
      grade: "",
      educational_attainment: "",
      finished_school: "",
      description: "",
    };

    if (userData?.role == "student") {
      user = {
        ...user,
        school: data.rows[0].school,
        grade: data.rows[0].grade,
      };
    } else {
      user = {
        ...user,
        educational_attainment: data.rows[0].educational_attainment,
        finished_school: data.rows[0].finished_school,
        description: data.rows[0].description,
      };
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
