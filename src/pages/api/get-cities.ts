import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-cities:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the cities.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cities = await query("SELECT * FROM cities_catalog", []);

    res.status(200).json(cities.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
