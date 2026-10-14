import { Link, useParams } from 'react-router-dom'
import { findCourse } from '../utils/findCourse.jsx'
import '../App.css'

function CourseDetailPage() {
  const { code } = useParams()
  const course = findCourse(code)

  if (!course) {
    return (
      <main className="course-page">
        <div className="course-alert" role="alert">
          <p>Không tìm thấy môn học có mã {code}</p>
          <Link to="/courses">Quay lại danh sách</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="course-page">
      <article className="course-card">
        <h1>{course.name}</h1>
        <dl>
          <div>
            <dt>Mã môn</dt>
            <dd>{course.code}</dd>
          </div>
          <div>
            <dt>Học kỳ</dt>
            <dd>{course.semester}</dd>
          </div>
          <div>
            <dt>Số tín chỉ</dt>
            <dd>{course.credits}</dd>
          </div>
          <div>
            <dt>Mô tả</dt>
            <dd>{course.desc}</dd>
          </div>
        </dl>
      </article>
      <Link className="course-back-link" to="/courses">
        ← Quay lại danh sách
      </Link>
    </main>
  )
}

export default CourseDetailPage
