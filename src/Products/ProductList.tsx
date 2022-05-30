import React, { useState, useEffect } from "react";
import { IProduct, IProductsMeta } from "./interfaces";
import Product from "./Product";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Input from "@mui/material/Input";
import "./Products.css";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsMeta, setProductsMeta] = useState<IProductsMeta>({
    per_page: 5,
    total_pages: 1,
  });
  const [page, setPage] = useState(1);
  const [searchId, setSearchId] = useState(""); //probably should keep this as number long-term, but it's more convenient as a string now
  const [error, setError] = useState("");

  useEffect(() => {
    getProductList();
  }, [page, searchId]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };


  const handleSearch = (e: { target: { value: string } }) => {
    const isNumber = /^\d+$/.test(e.target.value)  
      if(isNumber){
        setSearchId(e.target.value)
      }else{
        setSearchId("")
      }
    }

  const getProductList = () => {
    setError("");
    let url = "https://reqres.in/api/products";
    url += searchId !== "" ? `?id=${searchId}` : `?page=${page}&per_page=5`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const { data, total, total_pages } = response;
        if (data) {
          Array.isArray(data) ? setProducts(data) : setProducts([data]);
          setProductsMeta({ ...productsMeta, total_pages, total });
        } else {
          setProducts([]);
          setProductsMeta({ ...productsMeta, total_pages: 1, total: 0 });
          throw new Error("No data returned from API");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Box className="product-list">
      <Typography sx={{ margin: "0 auto" }} variant="h2">
        Product List
      </Typography>
      <Input
        inputProps={{ type: "number", inputMode: "numeric", pattern: "[0-9]*" }}
        name="searchId"
        placeholder={`Number between 1 and ${productsMeta.total}`}
        onChange={handleSearch}
        value={searchId}
        type="number"
      />
      <Typography variant="body2" component="p" color="error">
        {error}
      </Typography>
      <Box className="products">
        {products ? (
          products.map((product: IProduct) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <Typography variant="body1" component="p">
            No products found
          </Typography>
        )}
      </Box>
      <Pagination
        count={productsMeta.total_pages}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductList;
