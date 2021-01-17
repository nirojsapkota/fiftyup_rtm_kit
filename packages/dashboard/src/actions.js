import axios from 'axios';
import { track } from '@rtm-ui/tracker';

export const submitSurvey = async (url, email, products) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const data = { email, data: { products } };

  try {
    return await axios.post(url, data, config)
  } catch (error) {
    console.error(error)
    return false
  }
};

export const getSurvey = async (url, query) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: { email: query.email, t: Date.now() }
  };

  try {
    return await axios.get(url, config);
  } catch (error) {
    console.error(error)
    return false
  }

};

export const callTracker =  (options, action, products) => {

  const requiredOrder = options.map(option => option.value).sort();;
  const selectedProducts = []
  requiredOrder.forEach((product)=> {
    if (products.includes(product)) {
      selectedProducts.push(product);
    }
  })

  const formattedSelectedProducts = selectedProducts.map(product => product.replace(/ /g,"-").toLowerCase()).join('+')
  track( action, {category: 'dashboard-preferences', meta: {products: formattedSelectedProducts }});
};



