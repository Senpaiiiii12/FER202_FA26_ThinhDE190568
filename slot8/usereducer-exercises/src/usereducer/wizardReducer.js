export const COURSES = [
  { id: 'react', name: 'ReactJS cơ bản', fee: 2500000 },
  { id: 'node', name: 'NodeJS & Express', fee: 3000000 },
  { id: 'fullstack', name: 'Fullstack MERN', fee: 5000000 },
];

export const SCHEDULES = ['Sáng 2-4-6', 'Tối 3-5-7', 'Cuối tuần'];

export const STEPS = ['Thông tin', 'Khóa học', 'Xác nhận'];

const STEP_FIELDS = [
  ['fullName', 'email', 'phone'],
  ['courseId', 'schedule'],
  ['agree'],
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateField = (name, values) => {
  const value = values[name];

  switch (name) {
    case 'fullName':
      return value.trim().length >= 3 ? '' : 'Họ tên phải có ít nhất 3 ký tự';
    case 'email':
      return EMAIL_REGEX.test(value) ? '' : 'Email không hợp lệ';
    case 'phone':
      return /^0\d{9}$/.test(value)
        ? ''
        : 'Số điện thoại phải có 10 số và bắt đầu bằng 0';
    case 'courseId':
      return COURSES.some((course) => course.id === value) ? '' : 'Chọn một khóa học';
    case 'schedule':
      return SCHEDULES.includes(value) ? '' : 'Chọn lịch học';
    case 'agree':
      return value ? '' : 'Bạn cần xác nhận thông tin';
    default:
      return '';
  }
};

export const validateStep = (step, values) =>
  STEP_FIELDS[step].reduce((errors, name) => {
    const message = validateField(name, values);
    return message ? { ...errors, [name]: message } : errors;
  }, {});

export const initWizard = (initialCourseId = 'react') => ({
  step: 0,
  maxVisited: 0,
  values: {
    fullName: '',
    email: '',
    phone: '',
    courseId: initialCourseId,
    schedule: '',
    agree: false,
  },
  errors: {},
  submitted: false,
});

export const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action.payload;
      const values = { ...state.values, [name]: value };

      if (!state.errors[name]) return { ...state, values };

      const message = validateField(name, values);
      const errors = { ...state.errors };
      if (message) {
        errors[name] = message;
      } else {
        delete errors[name];
      }

      return { ...state, values, errors };
    }
    case 'NEXT': {
      const errors = validateStep(state.step, state.values);
      if (Object.keys(errors).length > 0) return { ...state, errors };

      const step = Math.min(state.step + 1, STEPS.length - 1);
      return {
        ...state,
        step,
        maxVisited: Math.max(state.maxVisited, step),
        errors: {},
      };
    }
    case 'BACK':
      return {
        ...state,
        step: Math.max(state.step - 1, 0),
        errors: {},
      };
    case 'GO_TO':
      if (
        !Number.isInteger(action.payload) ||
        action.payload < 0 ||
        action.payload > state.maxVisited ||
        action.payload >= STEPS.length
      ) {
        return state;
      }
      return { ...state, step: action.payload, errors: {} };
    case 'SUBMIT': {
      const errors = validateStep(state.step, state.values);
      if (Object.keys(errors).length > 0) return { ...state, errors };
      return { ...state, submitted: true, errors: {} };
    }
    case 'RESET':
      return initWizard(action.payload);
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`);
  }
};