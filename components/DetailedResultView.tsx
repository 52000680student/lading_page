'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { getValidToken } from '@/utils/auth';

interface DetailedResultViewProps {
  resultId: number;
  onBack: () => void;
}

interface ProfileData {
  id: number;
  profileCode: string;
  effectiveTime: string;
  profileCategory: string;
  profileCategoryName: string;
  requestId: number;
}

interface TestProfile {
  id: number;
  code: string;
  name: string;
  type: number;
  category: string;
  categoryName: string;
  parentId: number;
  parentName: string | null;
  parentCode: string | null;
  sampleType: string | null;
  sampleTypeName: string | null;
  displayOrder: number;
  status: boolean;
  effectiveTime: string;
  children: TestProfile[];
  hasChildren: boolean;
}

interface TestResult {
  id: number;
  testCode: string;
  result: string;
  resultText: string;
  oldResult: string | null;
  download: boolean;
  unit: string;
  higherLimit: number | null;
  lowerLimit: number | null;
  normalRange: string;
  state: number;
  color: string;
}

interface PatientInfo {
  fullName: string;
  address: string;
  sid: string;
  phoneNumber: string;
  requestDate: string;
  dateOfBirth: string;
  gender: string;
}

interface FinalComment {
  id: number;
  requestId: number;
  finalComment: string;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  updatedDate: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

const DetailedResultView: React.FC<DetailedResultViewProps> = ({ resultId, onBack }) => {
  const [profileData, setProfileData] = useState<ProfileData[]>([]);
  const [testProfiles, setTestProfiles] = useState<TestProfile[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [finalComment, setFinalComment] = useState<FinalComment | null>(null);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchDetailedData();
  }, [resultId]);

  const fetchDetailedData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getValidToken();
      if (!token) {
        throw new Error('No valid token found');
      }

      // Step 2: Fetch Result Profile Data
      const profileResponse = await fetch(
        `${BASE_URL}/api/la/v1/results/${resultId}/profile-updateresults?isTestSend=false`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const profiles: ProfileData[] = await profileResponse.json();
      setProfileData(profiles);

      // Step 3: Retrieve Full Test Profiles
      const codes = profiles.map(profile => ({
        Code: profile.profileCode,
        EffectiveTime: profile.effectiveTime
      }));

      const testProfileResponse = await fetch(
        `${BASE_URL}/api/la/v1/profiles/getFullTestProfileByListCode`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ codes })
        }
      );

      if (!testProfileResponse.ok) {
        throw new Error('Failed to fetch test profiles');
      }

      const testProfilesData: TestProfile[] = await testProfileResponse.json();
      setTestProfiles(testProfilesData);

      // Step 4: Retrieve Detailed Test Results
      const testResultsResponse = await fetch(
        `${BASE_URL}/api/la/v1/results/${resultId}/test-updateresults?isTestSend=false&isMBTest=false`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!testResultsResponse.ok) {
        throw new Error('Failed to fetch test results');
      }

      const testResultsData = await testResultsResponse.json();
      // Filter to retain only required fields
      const filteredResults: TestResult[] = testResultsData.map((result: any) => ({
        id: result.id,
        testCode: result.testCode,
        result: result.result,
        resultText: result.resultText,
        oldResult: result.oldResult,
        download: result.download,
        unit: result.unit,
        higherLimit: result.higherLimit,
        lowerLimit: result.lowerLimit,
        normalRange: result.normalRange,
        state: result.state,
        color: result.color
      }));
      setTestResults(filteredResults);

      // Step 7: Fetch and Display Final Comment
      const commentResponse = await fetch(
        `${BASE_URL}/api/la/v1/results/${resultId}/result-comment`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (commentResponse.ok) {
        const commentData: FinalComment = await commentResponse.json();
        setFinalComment(commentData);
      }

      // Step 8: Fetch Patient Information
      const patientResponse = await fetch(
        `${BASE_URL}/api/la/v1/results/${resultId}/patient-info`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (patientResponse.ok) {
        const patientData: PatientInfo = await patientResponse.json();
        setPatientInfo(patientData);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleSuiteExpansion = (suiteCode: string) => {
    const newExpanded = new Set(expandedSuites);
    if (newExpanded.has(suiteCode)) {
      newExpanded.delete(suiteCode);
    } else {
      newExpanded.add(suiteCode);
    }
    setExpandedSuites(newExpanded);
  };

  const getResultStyle = (color: string) => {
    switch (color) {
      case '0':
        return 'text-black text-center';
      case '1':
        return 'text-blue-600 text-left';
      case '2':
        return 'text-red-600 text-right';
      default:
        return 'text-black text-center';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case '0':
        return 'text-black';
      case '1':
        return 'text-blue-600';
      case '2':
        return 'text-red-600';
      default:
        return 'text-black';
    }
  };

  const findTestResult = (testCode: string): TestResult | undefined => {
    return testResults.find(result => result.testCode === testCode);
  };

  const renderTestRow = (test: TestProfile, isChild: boolean = false, index: number = 0) => {
    const result = findTestResult(test.code);
    
    const getStateText = (state: number) => {
      const stateMapping: { [key: number]: string } = {
        0: "Nháp",
        1: "Đã tiếp nhận",
        2: "Đã hủy",
        3: "Đã lấy mẫu",
        4: "Đã giao",
        5: "Đã nhận",
        6: "Tạm dừng",
        61: "RDS",
        7: "Đang p.tích",
        8: "Đã có KQ",
        9: "Đã X.nhận",
        90: "Đã phê duyệt",
        93: "Đang gửi KQ",
        95: "Đã ký số",
        99: "Đã gửi KQ"
      };
      return stateMapping[state] || "-";
    };
    
    return (
      <tr key={test.id} className={`border-b border-gray-200 ${isChild ? 'bg-gray-50' : 'bg-white'}`}>
        <td className={`px-4 py-3 text-sm text-center sticky left-0 bg-white z-10 ${isChild ? 'pl-8 bg-gray-50' : ''}`}>
          {index + 1}
        </td>
        <td className={`px-4 py-3 text-sm sticky left-16 bg-white z-10 ${isChild ? 'pl-8 bg-gray-50' : ''}`}>
          <div className={`font-medium text-gray-900`}>{test.name}</div>
          {test.sampleTypeName && (
            <div className="text-xs text-gray-400">Mẫu: {test.sampleTypeName}</div>
          )}
        </td>
        <td className={`px-4 py-3 text-sm sticky left-80 bg-white z-10 ${isChild ? 'bg-gray-50' : ''}`}>
          <div className={'text-gray-600'}>{test.code}</div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {patientInfo?.phoneNumber || '-'}
        </td>
        <td className="px-4 py-3 text-sm">
          {result ? (
            <div className={`font-medium ${getResultStyle(result.color)}`}>
              {result.result || '-'}
            </div>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {result?.resultText || '-'}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {result?.oldResult || '-'}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {result?.unit || '-'}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {result?.higherLimit || '-'}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {result?.lowerLimit || '-'}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {result?.normalRange || '-'}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {result ? getStateText(result.state) : '-'}
        </td>
        <td className="px-4 py-3 text-sm text-center">
          {result?.download ? (
            <span className="text-green-600">✓</span>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </td>
      </tr>
    );
  };

  const renderTestSuite = (suite: TestProfile, suiteIndex: number) => {
    const isExpanded = expandedSuites.has(suite.code);
    
    return (
      <React.Fragment key={suite.id}>
        <tr className="border-b border-gray-200 bg-blue-50">
          <td className="px-4 py-3 text-sm text-center sticky left-0 bg-blue-50 z-10">
            {suiteIndex + 1}
          </td>
          <td className="px-4 py-3 sticky left-16 bg-blue-50 z-10" colSpan={2}>
             <button
               onClick={() => toggleSuiteExpansion(suite.code)}
               className="flex items-center space-x-2 text-left w-full hover:text-blue-700"
             >
               {isExpanded ? (
                 <ChevronDown className="w-4 h-4 text-blue-600" />
               ) : (
                 <ChevronRight className="w-4 h-4 text-blue-600" />
               )}
               <div>
                 <div className="font-semibold text-blue-900">{suite.name}</div>
                 <div className="text-xs text-blue-600">{suite.code}</div>
               </div>
             </button>
           </td>
           <td className="px-4 py-3" colSpan={10}>
           </td>
        </tr>
        {isExpanded && suite.children.map((child, childIndex) => renderTestRow(child, true, childIndex))}
      </React.Fragment>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg text-gray-600">Đang tải chi tiết kết quả...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
            <div className="text-center py-12">
              <div className="text-red-600 text-lg font-semibold mb-2">Có lỗi xảy ra</div>
              <div className="text-gray-600">{error}</div>
              <button
                onClick={fetchDetailedData}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Chi tiết kết quả xét nghiệm</h1>
            <p className="text-gray-600 mt-1">ID: {resultId}</p>
          </div>

          {/* Administrative Information Section */}
          {patientInfo && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin hành chính</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Họ và tên:</span>
                    <p className="text-sm text-gray-900">{patientInfo.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">SID:</span>
                    <p className="text-sm text-gray-900">{patientInfo.sid}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Số điện thoại:</span>
                    <p className="text-sm text-gray-900">{patientInfo.phoneNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Ngày sinh:</span>
                    <p className="text-sm text-gray-900">{patientInfo.dateOfBirth}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Giới tính:</span>
                    <p className="text-sm text-gray-900">{patientInfo.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Ngày yêu cầu:</span>
                    <p className="text-sm text-gray-900">{patientInfo.requestDate}</p>
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <span className="text-sm font-medium text-gray-600">Địa chỉ:</span>
                    <p className="text-sm text-gray-900">{patientInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 sticky left-0 bg-gray-50 z-10">
                      STT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64 sticky left-16 bg-gray-50 z-10">
                      Tên XN
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32 sticky left-80 bg-gray-50 z-10">
                      Mã XN
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      SĐT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-60">
                      Kết quả ĐT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                      Kết quả ĐL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                      Kết quả cũ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      ĐVT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Ngưỡng trên
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Ngưỡng dưới
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      KTC
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Tải xuống
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testProfiles.map((profile, index) => {
                    if (profile.hasChildren) {
                      return renderTestSuite(profile, index);
                    } else {
                      return renderTestRow(profile, false, index);
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Final Comment */}
          {finalComment && finalComment.finalComment && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kết luận</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{finalComment.finalComment}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    Cập nhật: {new Date(finalComment.updatedDate).toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedResultView;