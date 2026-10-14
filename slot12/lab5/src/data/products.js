import baliBesakihTemple from '../assets/images/bali-besakih-temple.jpg'
import bangkokWatArun from '../assets/images/bangkok-wat-arun.jpg'
import danangGoldenBridge from '../assets/images/danang-golden-bridge.jpg'
import halongBay from '../assets/images/halong-bay.jpg'
import hoiAnLanterns from '../assets/images/hoi-an-lanterns.jpg'
import kyotoYasakaDori from '../assets/images/kyoto-yasaka-dori.jpg'
import parisEiffelTower from '../assets/images/paris-eiffel-tower.jpg'
import phuQuocSunset from '../assets/images/phu-quoc-sunset.jpg'
import sapaRiceTerraces from '../assets/images/sapa-rice-terraces.jpg'
import swissAlpsLakeGeneva from '../assets/images/swiss-alps-lake-geneva.jpg'

const products = [
  {
    id: 1,
    name: 'Tour Vịnh Hạ Long',
    description: 'Du thuyền giữa kỳ quan núi đá vôi và làn nước xanh ngọc.',
    price: 3500000,
    discount: 10,
    instock: true,
    rating: 4.9,
    category: 'Biển đảo',
    image: halongBay,
  },
  {
    id: 2,
    name: 'Tour khám phá Sa Pa',
    description: 'Chinh phục núi rừng Tây Bắc và khám phá bản làng địa phương.',
    price: 2800000,
    discount: 5,
    instock: true,
    rating: 4.8,
    category: 'Núi rừng',
    image: sapaRiceTerraces,
  },
  {
    id: 3,
    name: 'Tour Đà Nẵng - Bà Nà Hills',
    description: 'Tham quan Cầu Vàng, vui chơi tại Bà Nà và nghỉ dưỡng bên biển.',
    price: 4200000,
    discount: 12,
    instock: true,
    rating: 4.7,
    category: 'Thành phố',
    image: danangGoldenBridge,
  },
  {
    id: 4,
    name: 'Tour phố cổ Hội An',
    description: 'Dạo phố đèn lồng, thưởng thức ẩm thực và trải nghiệm thả hoa đăng.',
    price: 1900000,
    discount: 0,
    instock: true,
    rating: 4.9,
    category: 'Văn hóa',
    image: hoiAnLanterns,
  },
  {
    id: 5,
    name: 'Tour nghỉ dưỡng Phú Quốc',
    description: 'Thư giãn trên bãi biển, khám phá đảo và ngắm hoàng hôn.',
    price: 5600000,
    discount: 15,
    instock: true,
    rating: 4.8,
    category: 'Biển đảo',
    image: phuQuocSunset,
  },
  {
    id: 6,
    name: 'Tour Bangkok - Thái Lan',
    description: 'Khám phá chùa vàng, chợ địa phương và nhịp sống Bangkok.',
    price: 7900000,
    discount: 8,
    instock: true,
    rating: 4.6,
    category: 'Quốc tế',
    image: bangkokWatArun,
  },
  {
    id: 7,
    name: 'Tour Kyoto - Nhật Bản',
    description: 'Tham quan đền cổ, rừng tre và những con phố truyền thống.',
    price: 18900000,
    discount: 10,
    instock: false,
    rating: 4.9,
    category: 'Quốc tế',
    image: kyotoYasakaDori,
  },
  {
    id: 8,
    name: 'Tour Paris - Pháp',
    description: 'Thưởng ngoạn tháp Eiffel, bảo tàng và vẻ đẹp kinh đô ánh sáng.',
    price: 32900000,
    discount: 7,
    instock: true,
    rating: 4.7,
    category: 'Quốc tế',
    image: parisEiffelTower,
  },
  {
    id: 9,
    name: 'Tour Bali - Indonesia',
    description: 'Khám phá đền cổ, ruộng bậc thang và biển đảo nhiệt đới.',
    price: 14500000,
    discount: 10,
    instock: true,
    rating: 4.8,
    category: 'Quốc tế',
    image: baliBesakihTemple,
  },
  {
    id: 10,
    name: 'Tour khám phá Thụy Sĩ',
    description: 'Chiêm ngưỡng núi Alps, hồ nước trong xanh và làng cổ yên bình.',
    price: 45900000,
    discount: 5,
    instock: true,
    rating: 4.9,
    category: 'Quốc tế',
    image: swissAlpsLakeGeneva,
  },
]

export default products
