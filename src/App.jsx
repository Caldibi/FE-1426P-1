import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Table } from 'react-bootstrap';
import styled from 'styled-components';
import JSConfetti from 'js-confetti'



const BoughtItem = styled.tr`
  text-decoration: ${props => props.bought ? 'line-through' : 'none'};
  `;

const jsConfetti = new JSConfetti();

const DeleteButton = styled.button`
background-color: red;
color: white;
padding: 5px 10px;
border: none;
border-radius: 5px;
cursor: pointer;

&:hover {
  background-color: darkred;
}
`;

const shops = [
  {
    id: 1,
    name: "Migros"
  },
  {
    id: 2,
    name: "Toyzzshop"
  },
  {
    id: 3,
    name: "Koçtaş"
  },
  {
    id: 4,
    name: "Carrefoursa"
  },
  {
    id: 5,
    name: "Teknosa"
  }];

const categories = [
  {
    id: 1,
    name: "Elektronik"
  },
  {
    id: 2,
    name: "Oyuncak"
  },
  {
    id: 3,
    name: "Bakliyat"
  },
  {
    id: 4,
    name: "Şarküteri"
  },
  {
    id: 5,
    name: "Yapı"
  }];


function App() {

  const [productName, setProductName] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [shoppingCompleted, setShoppingCompleted] = useState(false);
 

  useEffect(() => {
    const allProductsBought = products.length > 0 && products.every(product => product.isBought);
  if (allProductsBought && !shoppingCompleted) {
    alert('Alışveriş Tamamlandı');
    jsConfetti.addConfetti();
    setShoppingCompleted(true);
          
    }
    if (!allProductsBought) {
      setShoppingCompleted(false);
    }
  }, [products, shoppingCompleted]);


  const handleAddProduct = () => {
    const newProduct = {
      id: Math.random(),
      name: productName,
      shop: selectedShop,
      category: selectedCategory
    };
    setProducts([...products, newProduct]);
  };

  const markAsBought = (index) => {
    const newProducts = [...products];
    newProducts[index].isBought = true;
    setProducts(newProducts);
  };

  
  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
   
  };

  return (
    <>
      <Container>
        <Form>

          <Form.Group>
            <Form.Label>Ürün Adı</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>


          <Form.Group>
            <Form.Label>Market</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedShop(e.target.value)}>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.name}>
                  {shop.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>


          <Form.Group>
            <Form.Label>Kategori</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category.id} value={category.setProductName}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button onClick={handleAddProduct}>Ekle</Button>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Ürün Adı</th>
              <th>Market</th>
              <th>Kategori</th>
              <th>Satın Alındı</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody>

            {products.map((product, index) => (

              <BoughtItem key={index} bought={product.isBought}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.shop}</td>
                <td>{product.category}</td>
                <td>
                  {!product.isBought && (
                    <button onClick={() => markAsBought(index)}>Satın Alındı Olarak İşaretle</button>
                  )}
                </td>
                <td>
                  <DeleteButton onClick={() => removeProduct(index)}>Sil</DeleteButton>
                </td>
              </BoughtItem>

            ))}
          </tbody>

        </Table>

      </Container>

    </>
  );

}



export default App
