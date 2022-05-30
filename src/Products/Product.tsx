import React from "react";
import { IProduct } from "./interfaces";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const Product = (props: { product: IProduct; key: number }) => {
  const { id, name, year, color, pantone_value } = props.product;
  return (
    <Card className="product" sx={{ background: color, boxShadow: `8px 8px 24px 0px ${color}`}}>
      <Typography variant="body1" component="p">{`#${id}`}</Typography>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name.toUpperCase()}
        </Typography>
        <Typography variant="h6" component="h3">
          Year: {year}
        </Typography>
        <Typography variant="h6" component="h4">
          Pantone value: {pantone_value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
