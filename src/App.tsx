// @ts-nocheck


import './App.css'
import NavigationBar from './assets/Components/NavigationBar'
import Footer from './assets/Components/Footer.tsx'
import TasksBar from './assets/Components/Section/TasksBar.tsx'
import Achievements from './assets/Components/Section/Achievements.tsx'
import { useComponentVisibility } from './assets/Components/Section/store.ts'
import Testing from './assets/Components/Section/Testing.tsx'


function App() {
const componentVisibility = useComponentVisibility((state) => state.componentVisibility)

  return (
    <>
<NavigationBar/>
<TasksBar/>
{componentVisibility.achievementsVisibility && (<Achievements/>)}
<Footer/>
    </>
  )
}

export default App
