import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Input,
  Grid,
  Divider,
  Sheet,
  Modal,
  ModalClose,
  Stack,
  ModalOverflow,
  ModalDialog,
} from "@mui/joy";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = ({ setNavbarToggel }) => {
  const [cartItems, setCartItems] = useState([]);
  const [layout, setLayout] = useState(undefined);
  const [scroll, setScroll] = useState(true);
  const token = localStorage.getItem("token");
  const userId = jwtDecode(token).userId;  
  const [open, setOpen] = useState(false);
  setNavbarToggel(true);
  const updateQuantity = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, count: Math.max(1, parseInt(value) || 1) }
          : item
      )
    );
  };

  const subtotal = cartItems
    .reduce((sum, item) => sum + item.id.price * item.count, 0)
    .toFixed(2);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        console.log(reselt.data.author[0].cartProdects);
        setCartItems(reselt.data.author[0].cartProdects);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Sheet sx={{ p: 4 }}>
      <Typography level="h3" sx={{ mb: 2 }}>
        🛒 Your Cart
      </Typography>
      <Grid container spacing={2}>
        {cartItems.map((item, i) => (
          <Grid xs={12} md={6} key={item._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="h5">{item.id.title}</Typography>
                <Typography level="body2">
                  Price: {item.id.price} JOD
                </Typography>
                <Input
                  type="number"
                  value={item.count}
                  onChange={(e) => updateQuantity(item._id, e.target.value)}
                  sx={{ width: 80, mt: 1 }}
                  slotProps={{ input: { min: 1 } }}
                />
                <Typography level="body2" sx={{ mt: 1 }}>
                  Total: {item.id.price * item.count} JOD
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "2%" }}>
          <Typography level="h4">Subtotal: {subtotal} JOD</Typography>
          <Button color="success" sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </div>
        <Grid
         container
         direction="column"
         sx={{
           justifyContent: "flex-end",
           alignItems: "center",
         }} 
      >
        <Typography level="h4"><Divider sx={{ my: 3 }} /></Typography>
          <React.Fragment>
            <Stack direction="row" spacing={1}>
              <Button
                style={{
                  fontWeight: "bolder",
                  border: "2px solid",
                  fontSize: "15px",
                }}
                variant="outlined"
                color="success"
                onClick={() => {
                  setLayout("center");
                }}
              >
                Online Payment
              </Button>
            </Stack>
            <Modal
              open={!!layout}
              onClose={() => {
                setLayout(undefined);
              }}
            >
              <ModalOverflow>
                <ModalDialog
                  aria-labelledby="modal-dialog-overflow"
                  layout={layout}
                >
                  <ModalClose />
                  <Typography id="modal-dialog-overflow" level="h2">
                    Overflow content
                  </Typography>

                  <PayPalScriptProvider options={{ clientId: "test" }}>
                    <PayPalButtons />
                  </PayPalScriptProvider>
                </ModalDialog>
              </ModalOverflow>
            </Modal>
          </React.Fragment>
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default Cart;
