import joi from "joi";
import dayjs from "dayjs";

export const visitSchema = joi.object({
  time: joi.number().integer().min(8).max(18).required(),
  date: joi
    .date()
    .min("now")
    .custom((value, helpers) => {
      if (dayjs(value).get("day") === 0 || dayjs(value).get("day") === 6) {
        return helpers.message({
          custom: "Finais de semana não estão disponiveis",
        });
      }
      return value;
    })
    .required(),
  doctorId: joi.number().required(),
});
