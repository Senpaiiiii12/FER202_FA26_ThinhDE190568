import { Link } from 'react-router-dom'
import { courses } from '../data/courses.js'

function CourseListPage() {
  return (
    <main>
      <h1>Danh sách môn học</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Mã môn</th>
            <th scope="col">Tên môn</th>
            <th scope="col">Số tín chỉ</th>
            <th scope="col">Học kỳ</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.code}>
              <td>
                <Link to={`/courses/${course.code}`}>{course.code}</Link>
              </td>
              <td>{course.name}</td>
              <td>{course.credits}</td>
              <td>{course.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default CourseListPage
