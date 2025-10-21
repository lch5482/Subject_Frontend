// API 기본 URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
//const API_URL = 'http://localhost:8000';

/**
 * 과제 검색
 * @param {string} query - 검색 키워드
 * @param {number} limit - 결과 개수
 * @param {number} threshold - 유사도 임계값
 * @returns {Promise<Array>} 검색 결과
 */
export async function searchProjects(query, limit = 10, threshold = 0.2) {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      threshold: threshold.toString()
    });

    const response = await fetch(`${API_URL}/api/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`검색 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('검색 API 오류:', error);
    throw error;
  }
}

/**
 * 과제 상세 정보 조회
 * @param {number} projectId - 과제 ID
 * @returns {Promise<Object>} 과제 상세 정보
 */
export async function getProjectDetail(projectId) {
  try {
    const response = await fetch(`${API_URL}/api/project/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`상세 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상세 조회 API 오류:', error);
    throw error;
  }
}

/**
 * 최근 공고 조회
 * @param {number} limit - 결과 개수
 * @returns {Promise<Array>} 최근 과제 목록
 */
export async function getRecentProjects(limit = 10) {
  try {
    const response = await fetch(`${API_URL}/api/projects/recent?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`최근 과제 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('최근 과제 조회 API 오류:', error);
    throw error;
  }
}

/**
 * 필터링 검색
 * @param {Object} filters - 필터 옵션
 * @returns {Promise<Array>} 필터링된 과제 목록
 */
export async function filterProjects(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    if (filters.organization) params.append('organization', filters.organization);
    if (filters.tag) params.append('tag', filters.tag);
    if (filters.status) params.append('status', filters.status);
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`${API_URL}/api/projects/filter?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`필터링 검색 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('필터링 검색 API 오류:', error);
    throw error;
  }
}

/**
 * 통계 정보 조회
 * @returns {Promise<Object>} 통계 정보
 */
export async function getStats() {
  try {
    const response = await fetch(`${API_URL}/api/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`통계 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('통계 조회 API 오류:', error);
    throw error;
  }
}