import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { addDays, addWeeks, addMonths, addYears } from "date-fns";
import { convertDateTime } from "@/utils/convertDateTime";

/**
 * @swagger
 * /api/add-availability:
 *   post:
 *     responses:
 *       200:
 *         description: Availability added successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { instructor_id, date, duration_h, duration_m, description, repeat } = req.body;
    const duration_min = duration_h * 60 + duration_m;
    const dates = [date];
    const end =
      repeat === "m" ? new Date(addYears(date, 1)) : repeat === "n" ? new Date(date) : new Date(addMonths(date, 1));

    let newDate = new Date(date);

    while (newDate < end) {
      if (repeat == "d") {
        newDate = addDays(newDate, 1);
        dates.push(convertDateTime(new Date(newDate)));
      }

      if (repeat == "w") {
        newDate = addWeeks(newDate, 1);
        dates.push(convertDateTime(new Date(newDate)));
      }

      if (repeat == "m") {
        newDate = addMonths(newDate, 1);
        dates.push(convertDateTime(new Date(newDate)));
      }
    }

    for (const d of dates) {
      await query(
        `INSERT INTO availability (instructor_id, start, duration_min, description) VALUES ($1, $2, $3, $4)`,
        [instructor_id, d, duration_min, description]
      );
    }

    res.status(200).json({ message: "Availability added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
