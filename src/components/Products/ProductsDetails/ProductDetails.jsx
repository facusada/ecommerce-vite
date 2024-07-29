//React
import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
//Services
import { fetchProductById } from '../../services/Products';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

    getProductDetails () {

    }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return null;
  
  return (
    <div>
      {/* Product Details */}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="100"
          image={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" className="" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ProductDetails