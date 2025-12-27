
import React, { useState } from 'react';
import { Map, ShoppingBag, User, Palmtree, Bell, Heart, Menu } from 'lucide-react';
import MapModule from './components/MapModule';
import ShopModule from './components/ShopModule';
import ProfileModule from './components/ProfileModule';
import VacationModule from './components/VacationModule';
import { AppTab, PetProfile } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.MAP);
  const [petProfile, setPetProfile] = useState<PetProfile | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.MAP:
        return <MapModule />;
      case AppTab.SHOP:
        return <ShopModule petProfile={petProfile} />;
      case AppTab.PROFILE:
        return <ProfileModule currentProfile={petProfile} onProfileUpdate={setPetProfile} />;
      case AppTab.VACATION:
        return <VacationModule />;
      default:
        return <MapModule />;
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-[1100] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Heart className="text-white" size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">PetCare Hub</h1>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Phiên bản Việt Nam</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-2xl">
            {[
              { id: AppTab.MAP, label: 'Bản đồ', icon: <Map size={18} /> },
              { id: AppTab.SHOP, label: 'Thức ăn & Shop', icon: <ShoppingBag size={18} /> },
              { id: AppTab.VACATION, label: 'Nghỉ dưỡng', icon: <Palmtree size={18} /> },
              { id: AppTab.PROFILE, label: 'Hồ sơ Thú cưng', icon: <User size={18} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-3 hover:bg-gray-100 rounded-full text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="md:hidden p-3 hover:bg-gray-100 rounded-full text-gray-500">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
        {renderContent()}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[1100] w-[90%] bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-2 flex items-center justify-around">
        {[
          { id: AppTab.MAP, icon: <Map size={24} />, label: 'Bản đồ' },
          { id: AppTab.SHOP, icon: <ShoppingBag size={24} />, label: 'Shop' },
          { id: AppTab.VACATION, icon: <Palmtree size={24} />, label: 'Nghỉ dưỡng' },
          { id: AppTab.PROFILE, icon: <User size={24} />, label: 'Tôi' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400'}`}
          >
            {tab.icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Pro-active Engagement Toast */}
      <div className="fixed bottom-28 right-6 z-[1000] max-w-xs animate-bounce hidden md:block">
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-blue-50 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
            <Bell size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Giảm giá chớp nhoáng!</p>
            <p className="text-[10px] text-gray-500">Purina Pro Plan đang giảm 20% tại cửa hàng Healthy Tails trên lộ trình của bạn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
