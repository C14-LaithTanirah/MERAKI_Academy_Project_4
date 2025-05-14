import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  Typography,
  Button,
  AspectRatio,
  Input,
  Sheet,
  Grid,
  RadioGroup,
  Radio,
  Box,
} from "@mui/joy";

const ProductPage = ({ setNavbarToggel }) => {
  const [size, setSize] = useState("");
  const [productDet, setProductDet] = useState({});
  const [quantity, setQuantity] = useState(1);
  const productId = localStorage.getItem("productId");
  const token = localStorage.getItem("token");
  const userId = jwtDecode(token).userId;
  setNavbarToggel(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/id/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        console.log(reselt.data);
        setProductDet(reselt.data.author[0]);
        setSize(reselt.data.author[0].size[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addToCartEvent = () => {
    axios
      .put(
        `http://localhost:5000/cart/${userId}/update`,
        {
          cartProdects: {
            id: productId,
            count: quantity,
            size: size,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((reselt) => {
        console.log(reselt);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Sheet sx={{ p: 4 }}>
        <Grid container spacing={10} justifyContent={"center"}>
          <Grid xs={12} md={4.5}>
            <Card>
              <AspectRatio ratio="1" sx={{ minWidth: 200 }}>
                <img
                  src={productDet.img}
                  alt={productDet.title}
                  loading="lazy"
                />
              </AspectRatio>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card variant="soft" color="neutral">
              <CardContent>
                <Typography level="h3" sx={{ mb: 1 }}>
                  {productDet.title}
                </Typography>
                <Typography level="body1" sx={{ mb: 2 }}>
                  {productDet.description}
                </Typography>
                <Typography level="title-lg" sx={{ mb: 2 }}>
                  {productDet.price} JOD
                </Typography>

                <Input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(e.target.value)}
                  sx={{ width: 100, mb: 2 }}
                  slotProps={{ input: { min: 1 } }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    id="segmented-controls-example"
                    sx={{ fontWeight: "lg", fontSize: "sm" }}
                  >
                    Size:
                  </Typography>
                  <RadioGroup
                    orientation="horizontal"
                    aria-labelledby="segmented-controls-example"
                    name="justify"
                    value={size}
                    onChange={(event) => {
                      setSize(event.target.value);
                      console.log(size);
                    }}
                    sx={{
                      minHeight: 48,
                      padding: "4px",
                      borderRadius: "12px",
                      bgcolor: "neutral.softBg",
                      "--RadioGroup-gap": "4px",
                      "--Radio-actionRadius": "8px",
                    }}
                  >
                    {productDet.size?.map((item) => (
                      <Radio
                        key={item}
                        color="neutral"
                        value={item}
                        disableIcon
                        label={item}
                        variant="plain"
                        sx={{ px: 2, alignItems: "center" }}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: {
                              ...(checked && {
                                bgcolor: "background.surface",
                                boxShadow: "sm",
                                "&:hover": {
                                  bgcolor: "background.surface",
                                },
                              }),
                            },
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>
                </Box>
                <Button onClick={addToCartEvent} color="neutral">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Sheet>
    </div>
  );
};

export default ProductPage;
