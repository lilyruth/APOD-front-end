import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, AppBar, Backdrop, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Divider, Link, Typography } from '@mui/material';
import BottomBar from './BottomBar';
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
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'black',
          padding: '1rem',
          color: 'lavender',
          height: '7rem',
          fontSize: '3rem',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      }
    }
  }
});

function Data() {

 const [apodInfo, setApodInfo] = useState([]);
 const [loading, setLoading] = useState(true);

 const load = () => {
  async function fetchAPOD() {
   const request = await axios.get('https://apodproxy.herokuapp.com/api')
   .catch(console.log())
   setApodInfo(request.data);
  }
  fetchAPOD();
}

 useEffect(() => {
  load()
 }, []);

 useEffect(() => {
   const timer = setTimeout(() => {
    if (apodInfo) {
      setLoading(false)
    }
   }, 1000);
   return () => clearTimeout(timer);
 }, [apodInfo])

 console.log(loading)

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
            variant="h5"
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
            target="_blank"
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
    { loading ? 
     <ThemeProvider theme={theme}> 
      <Backdrop
        open={true}>
        <CircularProgress
         color="secondary" />

      </Backdrop>
    </ThemeProvider> : null
    }
      <ThemeProvider theme={theme}> 
        <AppBar>
          <Typography
           variant="h4">
            NASA Photo of the Day
          </Typography>
        </AppBar> 
 
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '8rem'
      }}>{list}</div>

        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="secondary"
            aria-label="reload"
            onClick={() => {
              load();
              window.scroll(0,0);
            }}
            >Fetch More Stars</Button>
        </div>
        </ThemeProvider>
      <BottomBar />
    </>
  )

}

export default Data;