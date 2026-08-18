import React from "react";

const DetailsRow = ({ l }) => {
  const { title, categoryName, city, address, phoneUnformatted, url } = l;
  return (
    <tr>
      <th>1</th>
      <td>{title || ""}</td>
      <td>{categoryName || "Not Found"}</td>
      <td>{city || "not found"}</td>
      <td>{address || "Not Found"}</td>
      <td>{phoneUnformatted || "Not found"}</td>
      <td>{url || "Not Found"}</td>
    </tr>
  );
};

export default DetailsRow;
