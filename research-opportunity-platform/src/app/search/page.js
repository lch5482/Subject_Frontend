'use client'

import { useState, useEffect } from 'react';
import { Search, BookOpen, LogOut, User } from 'lucide-react';
import { searchProjects } from '@/lib/api';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    console.log('저장된 사용자 정보:', savedUser);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      console.log('파싱된 사용자 데이터:', userData);
      setUser(userData);
    } else {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    setLoading(true);
    
    try {
      console.log('검색 실행:', searchQuery);
      
      // 백엔드 API 호출
      const results = await searchProjects(searchQuery, 10, 0.2);
      
      console.log('검색 결과:', results);
      
      // 검색 결과를 localStorage에 임시 저장
      localStorage.setItem('searchResults', JSON.stringify(results));
      localStorage.setItem('lastSearchQuery', searchQuery);
      
      // 검색 결과 페이지로 이동
      window.location.href = `/results?query=${encodeURIComponent(searchQuery)}`;
      
    } catch (error) {
      console.error('검색 오류:', error);
      alert('검색 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('searchResults');
      localStorage.removeItem('lastSearchQuery');
      
      alert('로그아웃되었습니다.');
      window.location.href = '/';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">연구 기회 검색</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-1" />
                <span className="font-medium">{user.name}</span>
                <span className="mx-2">|</span>
                <span>{user.major}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 검색 영역 */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-2xl w-full mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-9 h-9 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3">연구 기회 검색</h2>
            <p className="text-gray-600 text-lg mb-2">
              관심 있는 연구 분야의 키워드를 입력하여 검색해보세요.
            </p>
            <p className="text-sm text-indigo-600">
              {user.major} 전공에 맞춤형 R&D 공고를 찾아보세요.
            </p>
          </div>

          {/* 검색창 */}
          <div className="relative max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="키워드(예: 전력저장, FPGA, 6G SoC)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="block w-full pl-12 pr-20 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    '검색'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 검색 팁 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">검색 팁</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                '인공지능',
                '바이오헬스',
                '로봇공학',
                '신재생에너지',
                '반도체',
                '블록체인'
              ].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setSearchQuery(keyword)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* 추가 안내 */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                맞춤형 검색 서비스
              </h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                회원님의 전공인 <span className="font-semibold">{user.major}</span>에 
                적합한 연구 기회와 공모전을 우선적으로 추천해드립니다.
                <br />
                키워드를 입력하여 더욱 정확한 맞춤형 정보를 찾아보세요.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}