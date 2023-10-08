import {useState, useEffect} from 'react';
import { Product } from '../App';

function PlaceOrder() {
    const [cart, setCart] = useState<Product[]>([]);
    const cartFromSessionStorage = sessionStorage.getItem('cart');
    useEffect(() => {
      if (cartFromSessionStorage) {
        setCart(JSON.parse(cartFromSessionStorage));
      }
    }, [cartFromSessionStorage]);
    // rest of the component code...
  }
  