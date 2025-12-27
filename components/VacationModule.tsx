
import React from 'react';
import { Umbrella, Calendar, ShieldCheck, MapPin, Star, UserCheck } from 'lucide-react';

const VacationModule: React.FC = () => {
  const services = [
    { title: 'Trông trẻ tại nhà', icon: <UserCheck className="text-green-500" />, desc: 'Người trông trẻ uy tín sẽ ở lại nhà bạn.', price: 'Từ 350.000đ/đêm' },
    { title: 'Khách sạn Thú cưng', icon: <MapPin className="text-blue-500" />, desc: 'Resort cao cấp với đội ngũ y tế trực 24/7.', price: 'Từ 500.000đ/đêm' },
    { title: 'Thăm khám định kỳ', icon: <Calendar className="text-orange-500" />, desc: 'Kiểm tra 30 phút mỗi ngày khi bạn vắng nhà.', price: 'Từ 150.000đ/lần' },
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden">
        <img src="https://picsum.photos/seed/vacation/1200/400" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6 text-white">
          <Umbrella size={48} className="mb-4" />
          <h1 className="text-4xl font-black mb-2">Bạn sắp đi du lịch?</h1>
          <p className="max-w-lg text-lg opacity-90">Đặt dịch vụ chăm sóc chuyên nghiệp để an tâm tận hưởng kỳ nghỉ của bạn.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
             <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               {s.icon}
             </div>
             <h3 className="text-xl font-bold mb-2">{s.title}</h3>
             <p className="text-gray-500 text-sm mb-6 leading-relaxed">{s.desc}</p>
             <div className="flex items-center justify-between mt-auto">
               <span className="font-black text-gray-900">{s.price}</span>
               <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                 Đặt ngay
               </button>
             </div>
          </div>
        ))}
      </div>

      <section className="bg-indigo-900 rounded-[2.5rem] p-10 text-white">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-800 px-4 py-2 rounded-full text-sm font-bold">
              <ShieldCheck size={18} className="text-green-400" /> Được bảo hiểm & Bảo vệ
            </div>
            <h2 className="text-3xl font-black">An tâm tuyệt đối trong mọi chuyến đi</h2>
            <p className="text-indigo-200 leading-relaxed">Chúng tôi kiểm duyệt mọi đối tác chăm sóc thông qua quy trình 5 bước, bao gồm kiểm tra lý lịch và chứng chỉ chuyên môn.</p>
            <div className="flex gap-4">
               <div className="flex-1 bg-indigo-800/50 p-4 rounded-2xl border border-indigo-700/50">
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-xs font-bold text-indigo-100">"Dịch vụ tốt nhất tôi từng dùng. 10/10!"</p>
                  <p className="text-[10px] text-indigo-300 mt-2">- Chị Lan K.</p>
               </div>
               <div className="flex-1 bg-indigo-800/50 p-4 rounded-2xl border border-indigo-700/50">
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-xs font-bold text-indigo-100">"Cún nhà mình rất thích khách sạn này!"</p>
                  <p className="text-[10px] text-indigo-300 mt-2">- Anh Minh M.</p>
               </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-white p-6 rounded-3xl text-gray-900 shadow-2xl space-y-4">
             <h3 className="font-bold">Tìm người trông thú cưng gần bạn</h3>
             <div className="space-y-3">
               <input type="text" placeholder="Thành phố của bạn" className="w-full p-3 rounded-xl bg-gray-100 border-none outline-none focus:ring-2 focus:ring-blue-500" />
               <input type="date" className="w-full p-3 rounded-xl bg-gray-100 border-none outline-none focus:ring-2 focus:ring-blue-500" />
               <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">Tìm kiếm ngay</button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VacationModule;
