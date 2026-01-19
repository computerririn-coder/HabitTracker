
import './App.css'
import NavigationBar from './assets/Components/NavigationBar'
import MainSection from './assets/Components/Section/MainSection'
import Footer from './assets/Components/Footer'
import TasksBar from './assets/Components/Section/TasksBar.tsx'
import AddNewTab from './assets/Components/Section/addNewTab.tsx'
import Testing from './assets/Components/Section/Testing.tsx'
import EditHotkey from './assets/Components/Section/editHotkey.tsx'
import Achievements from './assets/Components/Section/Achievements.tsx'


function App() {

  return (
    <>
    <Achievements/>
<NavigationBar/>
<TasksBar/>
<Footer/>
    </>
  )
}

export default App
