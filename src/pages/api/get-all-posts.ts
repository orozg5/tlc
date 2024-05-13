import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-all-posts:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the posts.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sql = `
    SELECT 
    forum_posts.*, 
    COALESCE(
        CASE 
            WHEN users.role = 'student' THEN students.first_name
            WHEN users.role = 'tutor' THEN instructors.first_name
        END
    ) AS first_name,
    COALESCE(
        CASE 
            WHEN users.role = 'student' THEN students.last_name
            WHEN users.role = 'tutor' THEN instructors.last_name
        END
    ) AS last_name,
    COALESCE(
        CASE 
            WHEN users.role = 'student' THEN students.profile_photo
            WHEN users.role = 'tutor' THEN instructors.profile_photo
        END
    ) AS profile_photo
    FROM 
      forum_posts 
    LEFT JOIN 
      users ON users.id = forum_posts.user_id 
    LEFT JOIN 
      students ON users.id = students.user_id AND users.role = 'student'
    LEFT JOIN 
      instructors ON users.id = instructors.user_id AND users.role = 'tutor'
    ORDER BY forum_posts.date DESC
    `;

    const posts = await query(sql, []);

    res.status(200).json(posts.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
