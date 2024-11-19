import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar'
import { Canvas } from './components/canvas';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='  flex bg-white overflow-hidden gap-[340px]'>
      <Sidebar isExpanded={isSidebarOpen}
        onToolSelect={() => {
          if (isSidebarOpen) {
            setIsSidebarOpen(false);
          }
        }}
        toggleSidebar={toggleSidebar}
      />
      <Canvas />

    </div>
  )
}

export default App
