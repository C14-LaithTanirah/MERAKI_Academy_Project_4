import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import CardActionArea from "@mui/material/CardActionArea";

const SearchPage = ({ setNavbarToggel }) => {
  const token = localStorage.getItem("token");
  const [prodects, setProdects] = useState([]);
  const navigate = useNavigate();
  const title = localStorage.getItem("search");
  setNavbarToggel(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${title}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        setProdects(reselt.data.author);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div
        className="text-center py-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(55, 53, 53, 0.5), rgba(255, 255, 255, 0.5))",
          marginBottom: "20px",
        }}
      >
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          {title}
        </h1>
      </div>
      <div className="py-4 fw-bold">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ maxWidth: "1300px", margin: "0 auto" }}
          >
            {prodects.map((pro, i) => (
              <Grid key={i} xs={12} sm={6} md={3}>
                <Card
                  className="ms-1"
                  sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}
                >
                  <CardActionArea
                    onClick={(e) => {
                      localStorage.setItem("productId", pro._id);
                      navigate("/productPage");
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio sx={{ minWidth: 200 }}>
                        <img src={pro.img} loading="lazy" />
                      </AspectRatio>
                    </CardOverflow>
                  </CardActionArea>
                  <CardContent>
                    <Typography level="body-sm">{pro.title}</Typography>
                    <Typography
                      level="title-lg"
                      sx={{ mt: 1, fontWeight: "xl" }}
                    >
                      {pro.price} JOD
                    </Typography>
                    <Typography level="body-xs">{pro.description}</Typography>
                  </CardContent>
                  <CardOverflow>
                    <Button variant="solid" color="neutral" size="lg">
                      Add To Cart
                    </Button>
                  </CardOverflow>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default SearchPage;
