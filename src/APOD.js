import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, Button, Card, CardActions, CardContent, CardMedia, Divider, Link, Typography } from '@mui/material';
import axios from 'axios';

const theme = createTheme({
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: '20rem',
          width: '16rem',
          border: '2px solid lavender',
          borderRadius: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '30px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: '22rem',
          background: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid lavender',
          borderRadius: '20px',
          marginLeft: '10px',
          marginRight: '10px',
          marginTop: '20px'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          background: 'black',
          color: 'lavender',
          marginBottom: '5px'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: 'lavender',
          marginTop: '10px',
          marginBottom: '10px'
        }
      }
    }
  }
});

function Data() {

 const [apodInfo, setApodInfo] = useState([]);

 useEffect(() => {
   async function fetchAPOD() {
    const request = await axios.get('/api')
    .catch(console.log())
    setApodInfo(request.data);
   }
   fetchAPOD();
 }, []);

 let list = apodInfo.map((item, index) => 
  ( 
    <ThemeProvider theme={theme}>
      <Card key={Math.floor(index + Math.random() * 10000)}>
        <CardMedia 
          component="img"
          alt={item.title}
          image={item.url}
          />

        <CardContent>
 
          <Typography 
            gutterBottom
            variant="h4"
            align="center"
            component="div">
              {item.title}
          </Typography>
          <Divider />  
           <Typography
           gutterBottom
             variant="body1"
             >
              {item.explanation}
           </Typography>

          {item.copyright ?  
           <>
            <Divider />  
              <Typography
              variant="body1"
              >
                © {item.copyright} 
              </Typography> 
            </>
            : null }
          <Divider />
          <Link
            color="lavender"
            underline="hover"
            variant="body1"
            href={item.hdurl}
             >
              Go to the high-def image
           </Link>
          
        </CardContent>
      </Card>
    </ThemeProvider>
  )
)

 return (
    <>  
    <Typography 
        variant="h1"
        align="center"
        component="div">
        NASA Photo of the Day
      </Typography>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>{list}</div>
    </>
  )

}

export default Data;