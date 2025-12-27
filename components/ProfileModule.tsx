
import React, { useState } from 'react';
import { Camera, Plus, Trash2, Heart, Activity, Scale } from 'lucide-react';
import { PetProfile } from '../types';

interface ProfileModuleProps {
  onProfileUpdate: (profile: PetProfile) => void;
  currentProfile: PetProfile | null;
}

const ProfileModule: React.FC<ProfileModuleProps> = ({ onProfileUpdate, currentProfile }) => {
  const [profile, setProfile] = useState<PetProfile>(currentProfile || {
    name: '',
    type: 'dog',
    age: 0,
    weight: 0,
    activityLevel: 'moderate',
    allergies: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileUpdate(profile);
    alert('Đã lưu hồ sơ thành công! Đề xuất AI đã được cập nhật.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center relative border-4 border-white shadow-lg mb-4 overflow-hidden">
               <img src={`https://picsum.photos/seed/${profile.name || 'pet'}/300/300`} className="w-full h-full object-cover" />
               <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg"><Camera size={18} /></button>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{profile.name || 'Tên thú cưng'}</h2>
            <p className="text-gray-500 capitalize">{profile.type === 'dog' ? 'Chó' : profile.type === 'cat' ? 'Mèo' : profile.type}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 flex items-center gap-2"><Heart size={16} /> Tên</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ví dụ: Lu Lu"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Loài</label>
              <select 
                value={profile.type}
                onChange={e => setProfile({...profile, type: e.target.value as any})}
                className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="dog">Chó</option>
                <option value="cat">Mèo</option>
                <option value="bird">Chim</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 flex items-center gap-2"><Activity size={16} /> Tuổi (Năm)</label>
              <input 
                type="number" 
                value={profile.age}
                onChange={e => setProfile({...profile, age: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 flex items-center gap-2"><Scale size={16} /> Cân nặng (kg)</label>
              <input 
                type="number" 
                value={profile.weight}
                onChange={e => setProfile({...profile, weight: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
               <label className="text-sm font-bold text-gray-600">Mức độ hoạt động</label>
               <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 'low', label: 'Thấp' },
                    { val: 'moderate', label: 'Vừa' },
                    { val: 'high', label: 'Cao' }
                  ].map(level => (
                    <button
                      key={level.val}
                      type="button"
                      onClick={() => setProfile({...profile, activityLevel: level.val as any})}
                      className={`py-3 rounded-2xl border font-bold transition-all ${profile.activityLevel === level.val ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-500 hover:border-blue-400'}`}
                    >
                      {level.label}
                    </button>
                  ))}
               </div>
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                Lưu Hồ sơ Thú cưng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModule;
