import 'bootstrap/dist/css/bootstrap.min.css'
import StudentCard from './components/StudentCard'

const students = [
  {
    id: 'DE1901',
    name: 'Nguyễn Thanh Tùng',
    major: 'Software Engineering',
    gpa: 8.5,
    avatar: '/images/SonTung.jpg',
    contact: {
      email: 'tung.nt@fpt.edu.vn',
      phone: '0912 345 678',
    },
  },
  {
    id: 'SE1702',
    name: 'Songoku',
    major: 'Digital Marketing',
    gpa: 8.9,
    avatar: '/images/Songoku.jpg',
    contact: {
      email: 'songoku@fpt.edu.vn',
      phone: '0912 543 678',
    },
  },
  {
    id: 'DE190568',
    name: 'Nguyễn Huỳnh Quốc Thịnh',
    major: 'Software Engineering',
    gpa: 9.9,
    avatar: '/images/QuocThinh.jpg',
    contact: {
      email: 'nhquocthinh12345@gmail.com',
      phone: '0916 375 384',
    },
  },
]

function App() {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center p-4">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  )
}

export default App
