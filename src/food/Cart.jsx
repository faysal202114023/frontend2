import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Badge, // Import Badge component
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function Cart({ cart, total, removeFromCart, clearCart }) {
  // Function to replace $ with ৳ in a string
  const replaceDollarWithTaka = (str) => str.replace('$', '৳');

  return (
    <Card className="cart">
      <CardContent>
        <Typography variant="h6">Your Cart</Typography>
        {cart.length === 0 ? (
          <Typography variant="subtitle1">Your cart is empty</Typography>
        ) : (
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.name} - $${item.price.toFixed(2)}`}
                />
                <ListItemSecondaryAction>
                  <Badge badgeContent={item.quantity} color="primary">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Badge>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="subtitle1">
          Total: {replaceDollarWithTaka(`$${total.toFixed(2)}`)}
        </Typography>
        {cart.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={clearCart}
            style={{ marginTop: '10px' }}
          >
            Clear Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default Cart;
