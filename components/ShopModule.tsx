
import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Star, TrendingUp, UserPlus, Info, X, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MOCK_FOODS } from '../constants';
import { FoodProduct, PetProfile } from '../types';
import { getFoodRecommendation, compareFoods } from '../services/geminiService';

interface ShopModuleProps {
  petProfile: PetProfile | null;
}

const ShopModule: React.FC<ShopModuleProps> = ({ petProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [comparing, setComparing] = useState<FoodProduct[]>([]);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);

  useEffect(() => {
    if (petProfile) {
      handleFetchRecommendations();
    }
  }, [petProfile]);

  const handleFetchRecommendations = async () => {
    if (!petProfile) return;
    setLoading(true);
    try {
      const res = await getFoodRecommendation(petProfile, MOCK_FOODS);
      setRecommendations(res.recommendations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleCompare = async () => {
    if (comparing.length !== 2) return;
    setLoading(true);
    try {
      const result = await compareFoods(comparing[0], comparing[1], petProfile);
      setComparisonResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = MOCK_FOODS.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm hạt, thức ăn ướt, bánh thưởng..." 
            className="w-full pl-10 pr-4 py-3 bg-white border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border rounded-xl hover:bg-gray-50 flex items-center gap-2">
            <TrendingUp size={18} /> Khoảng giá
          </button>
        </div>
      </div>

      {petProfile ? (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Dành riêng cho {petProfile.name}</h2>
              <p className="opacity-80">Đề xuất dinh dưỡng AI dựa trên hồ sơ của bạn</p>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur">
              <UserPlus size={24} />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec, i) => {
                const food = MOCK_FOODS.find(f => f.id === rec.foodId);
                if (!food) return null;
                return (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-400 text-green-900 text-[10px] font-bold px-2 py-1 rounded-full">{rec.score}% Phù hợp</span>
                    </div>
                    <h4 className="font-bold">{food.name}</h4>
                    <p className="text-xs opacity-90 line-clamp-2 mt-1">{rec.reason}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col items-center text-center">
          <UserPlus className="text-blue-500 mb-3" size={40} />
          <h3 className="text-lg font-bold text-gray-800">Muốn nhận đề xuất riêng?</h3>
          <p className="text-gray-600 mb-4 max-w-sm">Hãy tạo hồ sơ thú cưng để AI của chúng tôi gợi ý thức ăn tốt nhất cho cân nặng và sức khỏe của bé.</p>
        </div>
      )}

      {comparing.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[2000] w-full max-w-2xl px-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border-t-4 border-blue-500 p-4 flex items-center justify-between gap-4">
             <div className="flex gap-2">
                {comparing.map(c => (
                  <div key={c.id} className="relative group">
                    <img src={c.image} className="w-14 h-14 rounded-xl object-cover border-2 border-blue-100" />
                    <button onClick={() => setComparing(prev => prev.filter(p => p.id !== c.id))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><X size={10} /></button>
                  </div>
                ))}
                {comparing.length < 2 && <div className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 bg-gray-50"><ShoppingBag size={18} /></div>}
             </div>
             <div className="flex-1">
               <p className="text-sm font-black text-gray-800">Bộ máy So sánh</p>
               <p className="text-xs text-gray-500">Đã chọn {comparing.length}/2</p>
             </div>
             <button 
               onClick={handleCompare}
               disabled={comparing.length !== 2 || loading}
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold disabled:opacity-50 transition-all flex items-center gap-2"
             >
               {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <TrendingUp size={18} />}
               So sánh ngay
             </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFoods.map(food => (
          <div key={food.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
            <div className="relative h-48">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button 
                onClick={() => toggleFavorite(food.id)}
                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors ${favorites.includes(food.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:text-red-500'}`}
              >
                <Heart size={20} fill={favorites.includes(food.id) ? "currentColor" : "none"} />
              </button>
              {food.isSale && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  GIẢM GIÁ
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{food.brand}</p>
                  <h3 className="font-bold text-gray-800 line-clamp-1">{food.name}</h3>
                </div>
                <div className="flex items-center text-yellow-500 bg-yellow-50 px-1.5 py-0.5 rounded-lg">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-black ml-1">{food.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {food.isSale ? (
                  <>
                    <span className="text-xl font-black text-gray-900">{food.salePrice?.toLocaleString()}đ</span>
                    <span className="text-sm text-gray-400 line-through">{food.price.toLocaleString()}đ</span>
                  </>
                ) : (
                  <span className="text-xl font-black text-gray-900">{food.price.toLocaleString()}đ</span>
                )}
                <span className="text-[10px] text-gray-400 font-bold">/ {food.unitSize}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    if (comparing.find(c => c.id === food.id)) {
                      setComparing(prev => prev.filter(c => c.id !== food.id));
                    } else if (comparing.length < 2) {
                      setComparing(prev => [...prev, food]);
                    }
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${comparing.find(c => c.id === food.id) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {comparing.find(c => c.id === food.id) ? 'Đã chọn' : 'Chọn so sánh'}
                </button>
                <button className="bg-gray-900 hover:bg-black text-white p-2 rounded-xl transition-colors">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comparisonResult && comparing.length === 2 && (
        <div className="fixed inset-0 z-[3000] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col">
              <div className="p-8 border-b flex items-center justify-between bg-gray-50">
                <div>
                  <h2 className="text-3xl font-black text-gray-900">So sánh Dinh dưỡng</h2>
                  <p className="text-sm text-gray-500 mt-1">Dữ liệu chi tiết & Đánh giá mức độ phù hợp bằng AI</p>
                </div>
                <button onClick={() => setComparisonResult(null)} className="p-3 hover:bg-white hover:shadow-md transition-all rounded-full"><X /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-3 gap-8 mb-12">
                   <div className="space-y-4 pt-48">
                      <div className="h-12 border-b flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">Thương hiệu</div>
                      <div className="h-12 border-b flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">Giá / Trọng lượng</div>
                      <div className="h-12 border-b flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">Thành phần chính</div>
                      <div className="h-12 border-b flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">Chất đạm</div>
                      <div className="h-12 border-b flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">Chất béo</div>
                      <div className="h-12 border-b flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">Chất xơ</div>
                      <div className="h-20 border-b flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">Phù hợp nhất</div>
                   </div>

                   {comparing.map(food => (
                     <div key={food.id} className="space-y-4 text-center">
                        <div className="mb-6">
                           <img src={food.image} className="w-full h-40 object-cover rounded-3xl shadow-lg border-4 border-white mb-4" />
                           <h3 className="text-xl font-black text-gray-900">{food.name}</h3>
                        </div>
                        <div className="h-12 border-b flex items-center justify-center font-bold text-blue-600">{food.brand}</div>
                        <div className="h-12 border-b flex items-center justify-center font-black">{(food.salePrice || food.price).toLocaleString()}đ <span className="text-gray-400 ml-1 font-normal">({food.unitSize})</span></div>
                        <div className="h-12 border-b flex items-center justify-center text-xs text-gray-600 px-2 line-clamp-1">{food.ingredients.slice(0,3).join(', ')}...</div>
                        
                        <div className="h-12 border-b flex items-center justify-center gap-2">
                          <span className="font-black text-gray-900">{food.analysis.protein}%</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div className="bg-green-500 h-full" style={{ width: `${food.analysis.protein * 2}%` }}></div>
                          </div>
                        </div>

                        <div className="h-12 border-b flex items-center justify-center gap-2">
                          <span className="font-black text-gray-900">{food.analysis.fat}%</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div className="bg-orange-400 h-full" style={{ width: `${food.analysis.fat * 3}%` }}></div>
                          </div>
                        </div>

                        <div className="h-12 border-b flex items-center justify-center gap-2">
                          <span className="font-black text-gray-900">{food.analysis.fiber}%</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div className="bg-blue-400 h-full" style={{ width: `${food.analysis.fiber * 10}%` }}></div>
                          </div>
                        </div>

                        <div className="h-20 border-b flex flex-wrap gap-1 items-center justify-center p-2">
                           {food.suitability.map(tag => (
                             <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold">{tag}</span>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="bg-blue-600 rounded-[2rem] p-8 text-white">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur"><Zap size={24} fill="currentColor" /></div>
                      <div>
                        <h4 className="text-xl font-black">Đánh giá từ Chuyên gia AI</h4>
                        <p className="text-sm opacity-80">Góc nhìn cá nhân hóa cho thú cưng của bạn</p>
                      </div>
                   </div>
                   <div className="prose prose-invert max-w-none whitespace-pre-wrap font-medium leading-relaxed bg-white/10 p-6 rounded-2xl border border-white/10">
                      {comparisonResult}
                   </div>
                   {petProfile && (
                     <div className="mt-6 flex items-center gap-2 text-sm font-bold bg-green-400/20 w-fit px-4 py-2 rounded-full border border-green-400/30">
                        <CheckCircle2 size={16} className="text-green-300" /> Phù hợp với hồ sơ của {petProfile.name}
                     </div>
                   )}
                </div>
              </div>

              <div className="p-8 border-t bg-gray-50 flex items-center justify-between">
                 <button onClick={() => setComparing([])} className="text-gray-500 font-bold hover:text-red-500 transition-colors">Xóa so sánh</button>
                 <button onClick={() => setComparisonResult(null)} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95">Đóng phân tích</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ShopModule;
