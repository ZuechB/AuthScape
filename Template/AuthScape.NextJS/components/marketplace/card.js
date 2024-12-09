import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { background, border, paddingTop, position, textDecoration, width } from '@xstyled/styled-components';
import { Button, Stack } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard({product}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, position:"relative", border: "1px solid lightgray" }}>

      <Stack 
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          right: 0,
          width:"100%"
        }}>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon sx={{color:"lightgray"}} /> */}
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Stack>
      
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
        alt="Paella dish"
      />

      <CardContent>

        <Typography variant="h5">
          {product.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>


        <Stack direction="row" spacing={2} sx={{paddingTop:2}}>
          <Typography variant="h6" gutterBottom sx={{textDecoration:"line-through"}}>
            $45.66
          </Typography>

          <Typography variant="h6" gutterBottom>
            $45.66
          </Typography>
        </Stack>

        <Typography variant="h6" gutterBottom sx={{paddingTop:2}}>
            Qty: 300
        </Typography>

        <Button variant="contained" sx={{width:"100%", marginTop:2}}>Add To Cart</Button>

      </CardContent>
      
    </Card>
  );
}