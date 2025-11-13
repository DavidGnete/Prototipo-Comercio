'use client'
import Footer from "./components/footer"
import Home from "./Home/page"
import Products from "./components/PubliCard"
import Login from "./login/page"



export default function Homepage(){
  return(
    <div>
      <Home />
      <Products />
    </div>
  )
}