import { getJoyasModel, getFilterModel } from "../model/joyasModel.js";
import Hateoas from "../helpers/hateoas.js";


export const getJoyas = async (req, res) => {
  try {
    const { order_by, limits, page } = req.query;
    const joyas = await getJoyasModel(order_by, limits, page);
    const joyashateoas = await Hateoas("joya", joyas);
    res.status(200).json({ joya: joyashateoas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
export const getJoyassByFilters = async (req, res) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query;

    const joyas = await getFilterModel(
      precio_max,
      precio_min,
      categoria,
      metal
    );

    res.status(200).json(joyas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
