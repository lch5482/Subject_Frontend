'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { BookOpen, LogOut, User, DollarSign, Download, Heart, Share2, ArrowLeft, AlertTriangle, CheckCircle, Calendar, Building2, Tag } from 'lucide-react';
import { getProjectDetail } from '@/lib/api';

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      alert('로그인이 필요합니다.');
      router.push('/');
      return;
    }

    loadDetailData();
  }, [params.id, router]);

  const loadDetailData = async () => {
    setLoading(true);
    
    try {
      console.log('상세 정보 로드:', params.id);
      
      const data = await getProjectDetail(params.id);
      
      console.log('상세 정보:', data);
      
      setDetail(data);
      
    } catch (error) {
      console.error('상세 정보 로드 오류:', error);
      alert('상세 정보를 불러오는 중 오류가 발생했습니다.');
      router.push('/results');
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
      router.push('/');
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: detail.title,
        text: detail.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
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

  const getStatusColor = (status) => {
    switch (status) {
      case '접수중': return 'bg-green-100 text-green-800';
      case '접수예정': return 'bg-blue-100 text-blue-800';
      case '마감': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (loading) {
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
        
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-gray-600">상세 정보를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">해당 공고를 찾을 수 없습니다.</p>
          <button 
            onClick={() => router.push('/results')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            목록으로 돌아가기
          </button>
        </div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          뒤로가기
        </button>

        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <Building2 className="w-4 h-4 text-indigo-600 mr-1" />
                    <span className="text-sm text-indigo-600 font-medium">{detail.organization}</span>
                  {/*{detail.status && (
                    <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(detail.status)}`}>
                      {detail.status}
                    </span>
                  )}*/}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{detail.title}</h1>
                {detail.overview && (
                  <p className="text-gray-600 text-lg leading-relaxed">{detail.overview}</p>
                )}
                {!detail.overview && detail.description && (
                  <p className="text-gray-600 text-lg leading-relaxed">{detail.description}</p>
                )}
              </div>
              
              <div className="ml-8 text-right flex-shrink-0">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {calculateDday(detail.deadline)}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  {formatDate(detail.deadline)}
                </div>
                {detail.full_deadline && (
                  <div className="text-xs text-gray-400 mb-4">
                    {detail.full_deadline}
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFavorite}
                    className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full text-gray-400 hover:bg-gray-100"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {detail.tags && detail.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {detail.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {detail.announcement_date && (
              <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                <Calendar className="w-4 h-4 mr-1" />
                <span>공고일: {formatDate(detail.announcement_date)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {detail.objectives && detail.objectives.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">사업 목표</h2>
              <ul className="space-y-2">
                {detail.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(detail.eligibility_target || (detail.eligibility_requirements && detail.eligibility_requirements.length > 0) || (detail.eligibility_restrictions && detail.eligibility_restrictions.length > 0)) && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">신청 자격</h2>
              
              {detail.eligibility_target && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">지원 대상</h3>
                  <p className="text-gray-700">{detail.eligibility_target}</p>
                </div>
              )}
              
              {detail.eligibility_requirements && detail.eligibility_requirements.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">신청 요건</h3>
                  <ul className="space-y-1">
                    {detail.eligibility_requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {detail.eligibility_restrictions && detail.eligibility_restrictions.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 mb-2">제외 대상</h4>
                      <ul className="space-y-1">
                        {detail.eligibility_restrictions.map((restriction, index) => (
                          <li key={index} className="text-sm text-yellow-700">• {restriction}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {(detail.support_amount || (detail.support_details && detail.support_details.length > 0)) && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">지원 내용</h2>
              {detail.support_amount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">{detail.support_amount}</span>
                  </div>
                </div>
              )}
              {detail.support_details && detail.support_details.length > 0 && (
                <ul className="space-y-2">
                  {detail.support_details.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
            {/*
          {detail.source_file && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">출처 문서</h2>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-gray-400 mr-2" />
                  <div className="text-sm font-medium text-gray-900">{detail.source_file}</div>
                </div>
              </div>
            </div>
          )}*/}
        </div>
      </div>
    </div>
  );
}