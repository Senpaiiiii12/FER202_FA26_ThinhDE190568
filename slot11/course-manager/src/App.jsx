import { Navigate, Route, Routes } from 'react-router-dom'
import CourseListPage from './pages/CourseListPage.jsx'
import CourseDetailPage from './pages/CourseDetailPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />
      <Route path="/courses" element={<CourseListPage />} />
      <Route path="/courses/:code" element={<CourseDetailPage />} />
    </Routes>
  )
}

export default App
