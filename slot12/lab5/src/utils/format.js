export const formatVND = (amount) =>
  amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ??
  'Liên hệ'

export const getFinalPrice = ({ price = 0, discount = 0 }) =>
  Math.round(price * (1 - discount / 100))
