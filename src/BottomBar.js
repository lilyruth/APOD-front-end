import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, AppBar,  Link, Typography} from '@mui/material';


function BottomBar () {

 return (
  <div
   style={{
    background: "black",
    textAlign: "center", 
    bottom: 0,
    marginTop: 'auto',
    height: '3rem',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'

   }}>
      <Link
        color="lavender"
        underline="hover"
        variant="body1"
        href="https://apod.nasa.gov/apod/lib/about_apod.html"
        target="_blank"
         >
        NASA Astronomy Picture of the Day Official Page
      </Link>
  </div>
 )
}

export default BottomBar;