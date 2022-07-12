import Card from '../UI/Card';
import ProductItem from './ProductItem/ProductItem';

import classes from './AvailableProducts.module.css';
import { useEffect, useState } from 'react';

const DUMMY_PRODUCTS = [
    {
      id: 'p1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'p2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'p3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'p4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

const AvailableProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
      async function fetchProducts() {
        const response = await fetch('database url.json');

        if (!response.ok) {
          throw new Error('Something went wrong...');
        };

        const responseData = response.json();
        
        const mappedData = [];

        for (const key in responseData) {
          mappedData.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          });
        };
        setProducts(mappedData);
        setIsLoading(false);
      };

      fetchProducts().catch(error => {
        setIsLoading(false);
        setError(error.message);
      });

    }, []);

    if (isLoading) {
      return (
        <section className={classes.mealsLoading}>
          <p>Loading...</p>
        </section>
      );
    };

    if (error) {
      return (
        <section className={classes.mealsError}>
          <p>{error}</p>
        </section>
      );
    };

    const productsList = DUMMY_PRODUCTS.map(product => (
      <ProductItem 
        id={product.id}
        key={product.id} 
        name={product.name} 
        description={product.description} 
        price={product.price} 
      />
    ));

    return (
        <section className={classes.meals}>
          <Card>
            <ul>{productsList}</ul>
          </Card>
        </section>
    );
};

export default AvailableProducts;