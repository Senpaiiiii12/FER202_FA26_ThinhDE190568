import { courses } from '../data/courses.js'

export function findCourse(code) {
  if (typeof code !== 'string') {
    return undefined
  }

  const normalizedCode = code.toLowerCase()
  return courses.find((course) => course.code.toLowerCase() === normalizedCode)
}
