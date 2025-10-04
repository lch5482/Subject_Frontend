'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, BookOpen, LogOut, User, Calendar, List, Grid, Building2, Tag } from 'lucide-react';
import { searchProjects } from '@/lib/api';

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    limit: 10
  });
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      alert('로그인이 필요합니다.');
      router.push('/');
      return;
    }

    const query = searchParams.get('query');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    } else {
      const savedResults = localStorage.getItem('searchResults');
      const savedQuery = localStorage.getItem('lastSearchQuery');
      
      if (savedResults && savedQuery) {
        setSearchQuery(savedQuery);
        setResults(JSON.parse(savedResults));
      }
      setLoading(false);
    }
  }, [searchParams, router]);

  const performSearch = async (query) => {
    setLoading(true);
    
    try {
      console.log('검색 실행:', query, filters);
      
      const data = await searchProjects(query, filters.limit, 0.2);
      
      console.log('검색 결과:', data);
      
      setResults(data);
      
      localStorage.setItem('searchResults', JSON.stringify(data));
      localStorage.setItem('lastSearchQuery', query);
      
    } catch (error) {
      console.error('검색 오류:', error);
      alert('검색 중 오류가 발생했습니다. 백엔드 서버를 확인해주세요.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('searchResults');
      localStorage.removeItem('lastSearchQuery');
      alert('로그아웃되었습니다.');
      router.push('/');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '미정';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const calculateDday = (deadline) => {
    if (!deadline) return '미정';
    try {
      const today = new Date();
      const deadlineDate = new Date(deadline);
      const diffTime = deadlineDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return '마감';
      if (diffDays === 0) return 'D-Day';
      return `D-${diffDays}`;
    } catch {
      return '미정';
    }
  };

  const getDeadlineColor = (deadline) => {
    const dday = calculateDday(deadline);
    if (dday === '마감') return 'text-gray-500';
    if (dday.includes('D-') && parseInt(dday.replace('D-', '')) <= 7) {
      return 'text-red-600 font-semibold';
    }
    return 'text-orange-600';
  };

  const getSimilarityColor = (similarity) => {
    if (similarity >= 0.7) return 'bg-green-100 text-green-800';
    if (similarity >= 0.5) return 'bg-blue-100 text-blue-800';
    if (similarity >= 0.3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const sortResults = (resultsToSort) => {
    const sorted = [...resultsToSort];
    
    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.announcement_date || 0) - new Date(a.announcement_date || 0));
      case 'deadline':
        return sorted.sort((a, b) => new Date(a.deadline || '9999-12-31') - new Date(b.deadline || '9999-12-31'));
      case 'relevance':
      default:
        return sorted.sort((a, b) => b.similarity - a.similarity);
    }
  };

  const filteredAndSortedResults = sortResults(results);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/search')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">연구 기회 검색</h1>
              </button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">검색 조건</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">키워드 검색</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색어 입력..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleNewSearch(e)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button 
                    onClick={handleNewSearch}
                    className="absolute inset-y-0 right-0 px-3 text-indigo-600 hover:text-indigo-800"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">결과 개수</label>
                  <select 
                    value={filters.limit}
                    onChange={(e) => setFilters({...filters, limit: parseInt(e.target.value)})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value={5}>5개</option>
                    <option value={10}>10개</option>
                    <option value={20}>20개</option>
                    <option value={50}>50개</option>
                  </select>
                </div>
                {/**<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유사도 기준: {(filters.threshold * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={filters.threshold}
                    onChange={(e) => setFilters({...filters, threshold: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>낮음</span>
                    <span>높음</span>
                  </div>
                </div> */}
                
              </div>

              <button 
                onClick={() => performSearch(searchQuery)}
                disabled={loading}
                className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
              >
                {loading ? '검색 중...' : '다시 검색'}
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {"\""}{searchQuery}{"\""} 검색 결과
                    </h2>
                    <span className="text-sm text-gray-500">
                      총 {results.length}건
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="relevance">관련도순</option>
                      <option value="date">최신순</option>
                      <option value="deadline">마감일순</option>
                    </select>
                    <div className="flex border border-gray-300 rounded-md">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-gray-600">검색 중...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  다른 키워드로 다시 검색해보세요.
                </p>
                <button
                  onClick={() => router.push('/search')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  새로운 검색하기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedResults.map((result) => (
                  <div key={result.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Building2 className="w-4 h-4 text-indigo-600 mr-1" />
                            <span className="text-sm text-indigo-600 font-medium">{result.organization}</span>
                            <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getSimilarityColor(result.similarity)}`}>
                              관련도 {(result.similarity * 100).toFixed(0)}%
                            </span>
                          </div>
                          <h3 
                            className="text-lg font-medium text-gray-900 hover:text-indigo-600 cursor-pointer mb-2"
                            onClick={() => router.push(`/detail/${result.id}`)}
                          >
                            {result.title}
                          </h3>
                          {result.description && (
                            <p className="text-gray-600 text-sm line-clamp-2">{result.description}</p>
                          )}
                        </div>
                        <div className="ml-6 text-right">
                          <div className={`text-sm font-medium ${getDeadlineColor(result.deadline)}`}>
                            {calculateDday(result.deadline)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDate(result.deadline)}
                          </div>
                        </div>
                      </div>
                      
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {result.tags.slice(0, 5).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                          {result.tags.length > 5 && (
                            <span className="text-xs text-gray-500 py-0.5">
                              +{result.tags.length - 5}개
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => router.push(`/detail/${result.id}`)}
                          className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
                        >
                          상세 정보 보기 →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}