// 'use client'

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { ChevronDown, User, Lock, Mail, BookOpen } from 'lucide-react';

// export default function HomePage() {
//   const router = useRouter();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     name: '',
//     major: '',
//     studentId: ''
//   });
//   const [showMajorDropdown, setShowMajorDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 전공 분야 목록 (실제로는 API에서 가져올 데이터)
//   const majors = [
//     '컴퓨터공학',
//     '전자공학',
//     '기계공학',
//     '화학공학',
//     '생명공학',
//     '건축학',
//     '경영학',
//     '경제학',
//     '심리학',
//     '디자인학',
//     '의학',
//     '약학',
//     '수학',
//     '물리학',
//     '화학',
//     '생물학',
//     '문학',
//     '어학',
//     '법학',
//     '정치외교학'
//   ];

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleMajorSelect = (major) => {
//     setFormData({
//       ...formData,
//       major: major
//     });
//     setShowMajorDropdown(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       if (isLogin) {
//         // 로그인 로직
//         console.log('로그인:', { email: formData.email, password: formData.password });
        
//         // 실제 API 호출 예시 (나중에 구현)
//         // const response = await fetch('/api/auth/login', {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify({ email: formData.email, password: formData.password })
//         // });
        
//         // 임시로 사용자 정보를 localStorage에 저장 (실제로는 API 응답에서 받아올 데이터)
//         // 회원가입했던 사용자 정보 가져오기
//         const savedSignupData = localStorage.getItem('signupData');
        
//         if (!savedSignupData) {
//           alert('회원가입 정보를 찾을 수 없습니다. 먼저 회원가입을 해주세요.');
//           setLoading(false);
//           return;
//         }
        
//         const signupInfo = JSON.parse(savedSignupData);
        
//         // 이메일이 일치하는지 확인
//         if (signupInfo.email !== formData.email) {
//           alert('등록되지 않은 이메일입니다.');
//           setLoading(false);
//           return;
//         }
        
//         // 실제 회원가입한 정보로 사용자 정보 생성
//         const userInfo = {
//           id: '1',
//           email: signupInfo.email,
//           name: signupInfo.name,
//           major: signupInfo.major,
//           studentId: signupInfo.studentId
//         };
        
//         localStorage.setItem('user', JSON.stringify(userInfo));
//         localStorage.setItem('token', 'mock-jwt-token');
        
//         // NextJS router를 사용한 페이지 이동
//         router.push('/search');
        
//       } else {
//         // 회원가입 로직
//         if (formData.password !== formData.confirmPassword) {
//           alert('비밀번호가 일치하지 않습니다.');
//           setLoading(false);
//           return;
//         }
        
//         if (!formData.major) {
//           alert('전공을 선택해주세요.');
//           setLoading(false);
//           return;
//         }
        
//         if (formData.password.length < 6) {
//           alert('비밀번호는 6자 이상이어야 합니다.');
//           setLoading(false);
//           return;
//         }
        
//         console.log('회원가입:', formData);
        
//         // 실제 API 호출 예시 (나중에 구현)
//         // const response = await fetch('/api/auth/signup', {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify({
//         //     email: formData.email,
//         //     password: formData.password,
//         //     name: formData.name,
//         //     major: formData.major,
//         //     studentId: formData.studentId
//         //   })
//         // });
        
//         // 임시로 회원가입 정보를 localStorage에 저장 (실제로는 DB에 저장)
//         localStorage.setItem('signupData', JSON.stringify({
//           email: formData.email,
//           name: formData.name,
//           major: formData.major,
//           studentId: formData.studentId
//         }));
        
//         alert('회원가입 성공! 로그인 후 이용해주세요.');
//         setIsLogin(true);
//         setFormData({
//           email: formData.email, // 이메일은 그대로 두어서 바로 로그인할 수 있게
//           password: '',
//           confirmPassword: '',
//           name: '',
//           major: '',
//           studentId: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('오류가 발생했습니다. 다시 시도해주세요.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       email: '',
//       password: '',
//       confirmPassword: '',
//       name: '',
//       major: '',
//       studentId: ''
//     });
//   };

//   const handleTabSwitch = (loginMode) => {
//     setIsLogin(loginMode);
//     resetForm();
//     setShowMajorDropdown(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {/* 헤더 */}
//         <div className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
//               <BookOpen className="w-7 h-7 text-white" />
//             </div>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">연구 기회 검색</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {isLogin ? '로그인하여 맞춤 연구 기회를 찾아보세요' : '회원가입하고 연구 기회를 탐색해보세요'}
//           </p>
//         </div>

//         {/* 탭 전환 */}
//         <div className="flex bg-gray-100 rounded-lg p-1">
//           <button
//             onClick={() => handleTabSwitch(true)}
//             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//               isLogin 
//                 ? 'bg-white text-indigo-600 shadow-sm' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             로그인
//           </button>
//           <button
//             onClick={() => handleTabSwitch(false)}
//             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//               !isLogin 
//                 ? 'bg-white text-indigo-600 shadow-sm' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             회원가입
//           </button>
//         </div>

//         {/* 폼 */}
//         <div className="mt-8 space-y-6">
//           <div className="space-y-4">
//             {/* 이메일 */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 이메일 <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="이메일을 입력하세요"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             {/* 회원가입 추가 필드 */}
//             {!isLogin && (
//               <>
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                     이름 <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       required
//                       className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="이름을 입력하세요"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
//                     학번 <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="studentId"
//                     name="studentId"
//                     type="text"
//                     required
//                     className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="학번을 입력하세요"
//                     value={formData.studentId}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 {/* 전공 선택 */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     전공 <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <button
//                       type="button"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-left bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex items-center justify-between"
//                       onClick={() => setShowMajorDropdown(!showMajorDropdown)}
//                     >
//                       <span className={formData.major ? 'text-gray-900' : 'text-gray-500'}>
//                         {formData.major || '전공을 선택하세요'}
//                       </span>
//                       <ChevronDown className="h-5 w-5 text-gray-400" />
//                     </button>
                    
//                     {showMajorDropdown && (
//                       <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                         {majors.map((major) => (
//                           <button
//                             key={major}
//                             type="button"
//                             className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
//                             onClick={() => handleMajorSelect(major)}
//                           >
//                             {major}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* 비밀번호 */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 비밀번호 <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder={isLogin ? "비밀번호를 입력하세요" : "비밀번호 (6자 이상)"}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             {/* 비밀번호 확인 (회원가입시만) */}
//             {!isLogin && (
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   비밀번호 확인 <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="비밀번호를 다시 입력하세요"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div>
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               ) : (
//                 isLogin ? '로그인' : '회원가입'
//               )}
//             </button>
//           </div>

//           {/* 추가 링크 */}
//           {isLogin && (
//             <div className="text-center">
//               <button 
//                 type="button"
//                 className="text-sm text-indigo-600 hover:text-indigo-500"
//                 onClick={() => alert('비밀번호 재설정 기능은 개발 예정입니다.')}
//               >
//                 비밀번호를 잊으셨나요?
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'

import { useState, useEffect } from 'react';
import { Search, BookOpen, LogOut, User, Calendar, Building2, Clock } from 'lucide-react';
import { searchProjects, getRecentProjects } from '@/lib/api';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

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

    // 최근 공고 불러오기
    loadRecentProjects();
  }, []);

  const loadRecentProjects = async () => {
    try {
      setLoadingRecent(true);
      const projects = await getRecentProjects(6); // 6개만 표시
      setRecentProjects(projects);
    } catch (error) {
      console.error('최근 공고 로딩 오류:', error);
    } finally {
      setLoadingRecent(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    setLoading(true);
    
    try {
      console.log('검색 실행:', searchQuery);
      
      const results = await searchProjects(searchQuery, 10, 0.2);
      
      console.log('검색 결과:', results);
      
      localStorage.setItem('searchResults', JSON.stringify(results));
      localStorage.setItem('lastSearchQuery', searchQuery);
      
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

  const handleProjectClick = (projectId) => {
    window.location.href = `/detail/${projectId}`;
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return '미정';
    try {
      const date = new Date(deadline);
      const now = new Date();
      const diffTime = date - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return '마감';
      if (diffDays === 0) return '오늘 마감';
      if (diffDays <= 7) return `D-${diffDays}`;
      
      return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    } catch {
      return deadline;
    }
  };

  const getDeadlineColor = (deadline) => {
    if (!deadline) return 'text-gray-500';
    try {
      const date = new Date(deadline);
      const now = new Date();
      const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return 'text-gray-400';
      if (diffDays <= 3) return 'text-red-600 font-semibold';
      if (diffDays <= 7) return 'text-orange-600 font-semibold';
      return 'text-green-600';
    } catch {
      return 'text-gray-500';
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

      {/* 메인 영역 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 검색 섹션 */}
        <div className="max-w-2xl mx-auto mb-16">
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
          <div className="relative">
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
            <p className="text-sm text-gray-500 mb-4">추천 키워드</p>
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
        </div>

        {/* 최근 공고 섹션 */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">최근 공고</h3>
            <button
              onClick={() => window.location.href = '/projects'}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              전체 보기 →
            </button>
          </div>

          {loadingRecent ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">최근 공고가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* 마감일 배지 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDeadlineColor(project.deadline)}`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDeadline(project.deadline)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {project.status || '진행중'}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {project.title}
                  </h4>

                  {/* 기관명 */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Building2 className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{project.organization}</span>
                  </div>

                  {/* 설명 */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {project.description || project.overview || '상세 설명이 없습니다.'}
                  </p>

                  {/* 태그 */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* 공고일 */}
                  <div className="flex items-center text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>공고일: {project.announcement_date || '미정'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 추가 안내 */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-lg p-6">
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