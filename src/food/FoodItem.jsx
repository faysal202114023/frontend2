import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

function FoodItem({ item, addToCart }) {
  const foodItemStyle = {
    fontFamily: 'Fantasy', // Specify the desired font family
  };

  const cardStyle = {
    width: '250px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const priceStyle = {
    color: 'green', // Customize the color of the price
    marginTop: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  };

  return (
    <Card className="food-item" style={cardStyle}>
      <CardContent>
        <Typography variant="h6" style={{ ...foodItemStyle, textAlign: 'center' }}>
          {item.name}
        </Typography>
        <Typography variant="body2" style={priceStyle}>
          ৳{item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => addToCart(item)}
          variant="contained"
          color="primary"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default FoodItem;
