import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Card,
  CardContent,
  Table,
  Select,
  Option,
  Textarea,
  Switch,
  Modal,
  ModalDialog,
  ModalClose,
} from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 6000 },
];

function AdminDashboard() {
  const [category, setcategory] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [Products, setProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/category", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        setcategory(reselt.data.category);
      })
      .catch((err) => {
        console.log(err.message);
      });
    axios
      .get("http://localhost:5000/product", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        setProducts(reselt.data.prodect);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [category, Products]);

  const deleteCategoryFunEvent = (id) => {
    axios
      .delete(`http://localhost:5000/category/${id}/delete`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        console.log(reselt);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const deleteProductFunEvent = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}/delete`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((reselt) => {
        console.log(reselt);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const addCategoryFunEvent = () => {
    axios
      .post(
        `http://localhost:5000/category/create`,
        {
          categoryName: categoryName,
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
  const addProductFunEvent = () => {
    axios
      .post(
        `http://localhost:5000/product/create`,
        {
          title: newProduct.title,
          description: newProduct.description,
          img: newProduct.img,
          price: newProduct.price,
          size: newProduct.size.split("-"),
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
    <Box p={4} display="grid" gap={4}>
      <Typography level="h3">E-Shop Admin Dashboard</Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={2}
      >
        <Card>
          <CardContent>Category: {category.length}</CardContent>
        </Card>
        <Card>
          <CardContent>Products: {Products.length}</CardContent>
        </Card>
      </Box>

      <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
        <TabList>
          <Tab>Category</Tab>
          <Tab>Products</Tab>
          <Tab>Users</Tab>
        </TabList>

        <TabPanel value={0}>
          <Button sx={{ my: 2 }} onClick={() => setIsAddDialogOpen(true)}>
            Add category
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((ele, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{ele._id}</TableCell>
                    <TableCell>{ele.categoryName}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          id={ele._id}
                          size="sm"
                          onClick={(e) => {
                            console.log(e.target.id);

                            deleteCategoryFunEvent(e.target.id);
                          }}
                          color="danger"
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Modal
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
          >
            <ModalDialog>
              <ModalClose />
              <Typography level="h4">Add New category</Typography>
              <Box display="grid" gap={2} mt={2}>
                <Input
                  placeholder="category Name"
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      addCategoryFunEvent();
                      setIsAddDialogOpen(false);
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </ModalDialog>
          </Modal>
        </TabPanel>

        <TabPanel value={1}>
          <Button sx={{ my: 2 }} onClick={() => setIsAddDialogOpen(true)}>
            Add Product
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>size</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Products.map((ele, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{ele._id}</TableCell>
                    <TableCell>{ele.title}</TableCell>
                    <TableCell>{ele.size.join("-")}</TableCell>
                    <TableCell>{ele.price} JOD</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          id={ele._id}
                          onClick={(e) => {
                            deleteProductFunEvent(e.target.id);
                          }}
                          size="sm"
                          color="danger"
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Modal
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
          >
            <ModalDialog>
              <ModalClose />
              <Typography level="h4">Add New Product</Typography>
              <Box display="grid" gap={2} mt={2}>
                <Input
                  placeholder="Product Name"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, title: e.target.value });
                  }}
                />
                <Textarea
                  placeholder="Product Description"
                  onChange={(e) => {
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    });
                  }}
                />
                <Input
                  placeholder="Size"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, size: e.target.value });
                  }}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, price: e.target.value });
                  }}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, img: e.target.value });
                  }}
                />

                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      addProductFunEvent();
                      setIsAddDialogOpen(false);
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </ModalDialog>
          </Modal>
        </TabPanel>

        <TabPanel value={2}>
          <Button sx={{ my: 2 }}>Manage Users</Button>
        </TabPanel>
      </Tabs>

      <Card>
        <CardContent>
          <Typography level="h4" sx={{ mb: 2 }}>
            Monthly Sales
          </Typography>
          <Box height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminDashboard;
