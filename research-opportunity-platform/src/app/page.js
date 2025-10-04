'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, User, Lock, Mail, BookOpen } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    major: '',
    studentId: ''
  });
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // 전공 분야 목록 (실제로는 API에서 가져올 데이터)
  const majors = [
    '컴퓨터공학',
    '전자공학',
    '기계공학',
    '화학공학',
    '생명공학',
    '건축학',
    '경영학',
    '경제학',
    '심리학',
    '디자인학',
    '의학',
    '약학',
    '수학',
    '물리학',
    '화학',
    '생물학',
    '문학',
    '어학',
    '법학',
    '정치외교학'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMajorSelect = (major) => {
    setFormData({
      ...formData,
      major: major
    });
    setShowMajorDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // 로그인 로직
        console.log('로그인:', { email: formData.email, password: formData.password });
        
        // 실제 API 호출 예시 (나중에 구현)
        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: formData.email, password: formData.password })
        // });
        
        // 임시로 사용자 정보를 localStorage에 저장 (실제로는 API 응답에서 받아올 데이터)
        // 회원가입했던 사용자 정보 가져오기
        const savedSignupData = localStorage.getItem('signupData');
        
        if (!savedSignupData) {
          alert('회원가입 정보를 찾을 수 없습니다. 먼저 회원가입을 해주세요.');
          setLoading(false);
          return;
        }
        
        const signupInfo = JSON.parse(savedSignupData);
        
        // 이메일이 일치하는지 확인
        if (signupInfo.email !== formData.email) {
          alert('등록되지 않은 이메일입니다.');
          setLoading(false);
          return;
        }
        
        // 실제 회원가입한 정보로 사용자 정보 생성
        const userInfo = {
          id: '1',
          email: signupInfo.email,
          name: signupInfo.name,
          major: signupInfo.major,
          studentId: signupInfo.studentId
        };
        
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('token', 'mock-jwt-token');
        
        // NextJS router를 사용한 페이지 이동
        router.push('/search');
        
      } else {
        // 회원가입 로직
        if (formData.password !== formData.confirmPassword) {
          alert('비밀번호가 일치하지 않습니다.');
          setLoading(false);
          return;
        }
        
        if (!formData.major) {
          alert('전공을 선택해주세요.');
          setLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          alert('비밀번호는 6자 이상이어야 합니다.');
          setLoading(false);
          return;
        }
        
        console.log('회원가입:', formData);
        
        // 실제 API 호출 예시 (나중에 구현)
        // const response = await fetch('/api/auth/signup', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     email: formData.email,
        //     password: formData.password,
        //     name: formData.name,
        //     major: formData.major,
        //     studentId: formData.studentId
        //   })
        // });
        
        // 임시로 회원가입 정보를 localStorage에 저장 (실제로는 DB에 저장)
        localStorage.setItem('signupData', JSON.stringify({
          email: formData.email,
          name: formData.name,
          major: formData.major,
          studentId: formData.studentId
        }));
        
        alert('회원가입 성공! 로그인 후 이용해주세요.');
        setIsLogin(true);
        setFormData({
          email: formData.email, // 이메일은 그대로 두어서 바로 로그인할 수 있게
          password: '',
          confirmPassword: '',
          name: '',
          major: '',
          studentId: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      major: '',
      studentId: ''
    });
  };

  const handleTabSwitch = (loginMode) => {
    setIsLogin(loginMode);
    resetForm();
    setShowMajorDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">연구 기회 검색</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? '로그인하여 맞춤 연구 기회를 찾아보세요' : '회원가입하고 연구 기회를 탐색해보세요'}
          </p>
        </div>

        {/* 탭 전환 */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleTabSwitch(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => handleTabSwitch(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            회원가입
          </button>
        </div>

        {/* 폼 */}
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 회원가입 추가 필드 */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="이름을 입력하세요"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                    학번 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="학번을 입력하세요"
                    value={formData.studentId}
                    onChange={handleInputChange}
                  />
                </div>

                {/* 전공 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    전공 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-left bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex items-center justify-between"
                      onClick={() => setShowMajorDropdown(!showMajorDropdown)}
                    >
                      <span className={formData.major ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.major || '전공을 선택하세요'}
                      </span>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </button>
                    
                    {showMajorDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {majors.map((major) => (
                          <button
                            key={major}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                            onClick={() => handleMajorSelect(major)}
                          >
                            {major}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={isLogin ? "비밀번호를 입력하세요" : "비밀번호 (6자 이상)"}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 비밀번호 확인 (회원가입시만) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                isLogin ? '로그인' : '회원가입'
              )}
            </button>
          </div>

          {/* 추가 링크 */}
          {isLogin && (
            <div className="text-center">
              <button 
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-500"
                onClick={() => alert('비밀번호 재설정 기능은 개발 예정입니다.')}
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}