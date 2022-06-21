import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import {Header} from "./components/Header/Header.jsx"
import {Instructions} from "./components/Instructions/Instructions.jsx"
import { createDataSet } from "./data/dataset"
import {Chip} from "./components/Chip/Chip.jsx"
import {NutritionalLabel} from "./components/NutritionalLabel/NutritionalLabel"
import "./App.css"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

const selectedCat = null



export function App() {
  const [currCat, setCategory] = React.useState("") //returns an array the array will have [value, setValue]
  const [currRes, setRestaurant] = React.useState("")
  const [currFood, setFood] = React.useState("")
  var currentMenuItems = data.filter((menu) => {return (menu.food_category == currCat && menu.restaurant == currRes)})
  console.log(currentMenuItems)
  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {
            categories.map( category => { 
             
              return <Chip useClick={ () => {
               setCategory(category)
              }} isActive={currCat==category} label={category} />
              
            })

          }
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header appInfo={appInfo}/>

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
          {
            restaurants.map( restaurant => {
              return <Chip useClick={ () => {
                setRestaurant(restaurant)
               }} isActive={currRes==restaurant} label={restaurant}/>
            })
          }</div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions={appInfo.instructions} />

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {
              currentMenuItems.map((foodItem,index) => 
                {
                 return <Chip key={index} useClick={() => {
                  setFood(foodItem)
                }} 
                isActive={currFood == foodItem} label={foodItem.item_name} />
              })
            }
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">{
            <NutritionalLabel item={appInfo}/>
          
          }</div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
