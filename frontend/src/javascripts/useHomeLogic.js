import { useState, useEffect } from "react";

export const useHomeLogic = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    entryDate: "",
    expirationDate: "",
  });

  // Derived state
  const lowStockOrExpiredProducts = products.filter(
    (product) =>
      product.quantity <= 5 ||
      new Date(product.expirationDate) < new Date()
  );

  // Handlers
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleInputChange = (field, value) => {
    if (currentProduct) {
      setCurrentProduct({ ...currentProduct, [field]: value });
    } else {
      setNewProduct({ ...newProduct, [field]: value });
    }
  };

  const handleAddProduct = () => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
      entryDate: "",
      expirationDate: "",
    });
    setIsAddProductModalOpen(false);
  };

  const handleEditClick = (index) => {
    setCurrentProduct({ ...products[index], index });
    setIsEditModalOpen(true);
  };

  const handleEditProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[currentProduct.index] = currentProduct;
    setProducts(updatedProducts);
    setCurrentProduct(null);
    setIsEditModalOpen(false);
  };

  const closeModal = () => {
    setIsAddProductModalOpen(false);
    setIsEditModalOpen(false);
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
      entryDate: "",
      expirationDate: "",
    });
    setCurrentProduct(null);
  };

  // Example useEffect (if needed)
  useEffect(() => {
    // Initial fetch or side effects
    console.log("Logic loaded!");
  }, []);

  return {
    isSidebarOpen,
    toggleSidebar,
    isAddProductModalOpen,
    setIsAddProductModalOpen,
    isEditModalOpen,
    currentProduct,
    products,
    newProduct,
    lowStockOrExpiredProducts,
    handleInputChange,
    handleAddProduct,
    handleEditClick,
    handleEditProduct,
    closeModal,
  };
};
