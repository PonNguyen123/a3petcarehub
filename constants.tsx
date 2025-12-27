
import { FoodProduct, MapMarker } from './types';

export const MOCK_STORES: MapMarker[] = [
  { id: 's1', lat: 34.0522, lng: -118.2437, type: 'store', name: 'Siêu thị Thú cưng Paws & Claws', address: '123 Đường Lê Lợi, Quận 1, TP.HCM' },
  { id: 's2', lat: 34.0622, lng: -118.2537, type: 'store', name: 'Thực phẩm Thú cưng Hữu cơ', address: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM' },
  { id: 'h1', lat: 34.0422, lng: -118.2337, type: 'hospital', name: 'Bệnh viện Thú y Thành Phố', address: '789 Đường CMT8, Quận 3, TP.HCM' },
  { id: 'h2', lat: 34.0722, lng: -118.2637, type: 'hospital', name: 'Trạm Thú y Cấp cứu VetReady', address: '101 Đường Võ Văn Kiệt, Quận 5, TP.HCM' },
];

export const MOCK_FOODS: FoodProduct[] = [
  { 
    id: 'f1', 
    name: 'Thức ăn Chó trưởng thành Gold', 
    brand: 'Purina', 
    price: 950000, 
    unitSize: '15kg',
    rating: 4.8, 
    category: 'dog', 
    isSale: true, 
    salePrice: 850000, 
    image: 'https://picsum.photos/seed/food1/300/200',
    ingredients: ['Thịt gà', 'Gạo', 'Gluten ngô', 'Mỡ gia cầm'],
    analysis: { protein: 26, fat: 16, fiber: 3 },
    suitability: ['Chó trưởng thành', 'Giống chó năng động']
  },
  { 
    id: 'f2', 
    name: 'Thức ăn Mèo Cá hồi Không ngũ cốc', 
    brand: 'Blue Buffalo', 
    price: 650000, 
    unitSize: '5kg',
    rating: 4.5, 
    category: 'cat', 
    isSale: false, 
    image: 'https://picsum.photos/seed/food2/300/200',
    ingredients: ['Cá hồi', 'Đậu hà lan', 'Khoai tây', 'Bột cá'],
    analysis: { protein: 32, fat: 15, fiber: 6 },
    suitability: ['Mèo nuôi trong nhà', 'Dạ dày nhạy cảm']
  },
  { 
    id: 'f3', 
    name: 'Hỗn hợp Sức khỏe Chó già', 
    brand: 'Royal Canin', 
    price: 1200000, 
    unitSize: '10kg',
    rating: 4.9, 
    category: 'dog', 
    isSale: false, 
    image: 'https://picsum.photos/seed/food3/300/200',
    ingredients: ['Bột thịt gà', 'Gạo lứt', 'Bột yến mạch', 'Bột củ cải đường'],
    analysis: { protein: 22, fat: 12, fiber: 5 },
    suitability: ['Chó già (7+)', 'Hỗ trợ xương khớp']
  },
  { 
    id: 'f4', 
    name: 'Công thức Tăng trưởng Mèo con', 
    brand: 'Hill\'s Science', 
    price: 520000, 
    unitSize: '3kg',
    rating: 4.7, 
    category: 'cat', 
    isSale: true, 
    salePrice: 450000, 
    image: 'https://picsum.photos/seed/food4/300/200',
    ingredients: ['Thịt gà', 'Lúa mì', 'Trứng', 'Dầu cá'],
    analysis: { protein: 35, fat: 18, fiber: 2 },
    suitability: ['Mèo con', 'Mèo mẹ đang nuôi con']
  },
  { 
    id: 'f5', 
    name: 'Thức ăn Vịt Không gây dị ứng', 
    brand: 'Wellness', 
    price: 1500000, 
    unitSize: '12kg',
    rating: 4.6, 
    category: 'dog', 
    isSale: false, 
    image: 'https://picsum.photos/seed/food5/300/200',
    ingredients: ['Thịt vịt', 'Yến mạch', 'Đậu hà lan xay', 'Hạt lanh xay'],
    analysis: { protein: 24, fat: 14, fiber: 4 },
    suitability: ['Chó dễ bị dị ứng', 'Da nhạy cảm']
  },
];
