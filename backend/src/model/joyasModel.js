import { pool } from "../../db/db.js";
import format from "pg-format";

export const getJoyasModel = async (
  order_by = "id_ASC",
  limits = 10,
  page = 0
) => {
  const [attribute, direction] = order_by.split("_");
  console.log("attibute", attribute);
  console.log("direction", direction);
  const offset = page * limits;
  const alljoyas = format(
    "SELECT * FROM inventario ORDER BY %s %s  LIMIT %s OFFSET %s",
    attribute,
    direction,
    limits,
    offset
  );
  const response = await pool.query(alljoyas);
  return response.rows;
};

export const getFilterModel = async (
  precio_max,
  precio_min,
  categoria,
  metal
) => {
  let filtros = [];
  const values = [];
  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };
  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  if (metal) agregarFiltro("metal", "=", metal);
  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }
  const { rows: joyasfilter } = await pool.query(consulta, values);
  return joyasfilter;
};
