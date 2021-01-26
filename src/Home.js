import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
        <img
          className='home_image'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/TheGrandTourS4/CHMA_S4SP2_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB413892615_.jpg'
        />
        <div className='home_row'>
          <Product
            id='1234134'
            title='Livro auto ajuda'
            price={20.0}
            rating={5}
            image='data:image/png;base64,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'
          />
          <Product
            id='123'
            title='Livro Vingadores'
            price={120.0}
            rating={3}
            image='https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ-VbYfOU8ArmeHnamUI_wkU8P080FafOpbouyJmxOoJHNjj7YJ-O8TaPoZUBP2vQ&usqp=CAc'
          />
          <Product
            id='1234444'
            title='Livro Homem Aranha'
            price={90.0}
            rating={4}
            image='https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTIZCKuu6msllMzZUOnzMkB0UBZH1ok7iI9uLzgqCkytl9uxWXFiI5PHd1yIRh1QzI9Htlmzxa3tNX1H_yGt99KCxIwxf55LsKLx4g5A2F3YcJziCG2Ax_6kg&usqp=CAc'
          />
        </div>
        {/* <div className='home_row'>
          <Product />
          <Product />
          <Product />
        </div>
        <div className='home_row'>
          <Product />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
