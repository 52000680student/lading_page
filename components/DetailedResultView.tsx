'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { getValidToken } from '@/utils/auth';

interface DetailedResultViewProps {
  resultId: number;
  onBack: () => void;
  showBackButton?: boolean;
  patientInfo?: PatientInfo;
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

const DetailedResultView: React.FC<DetailedResultViewProps> = ({ resultId, onBack, showBackButton = true, patientInfo: providedPatientInfo }) => {
  const [profileData, setProfileData] = useState<ProfileData[]>([]);
  const [testProfiles, setTestProfiles] = useState<TestProfile[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [finalComment, setFinalComment] = useState<FinalComment | null>(null);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(providedPatientInfo || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchDetailedData();
  }, [resultId]);

  useEffect(() => {
    if (providedPatientInfo) {
      setPatientInfo(providedPatientInfo);
    }
  }, [providedPatientInfo]);

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
      <tr key={test.id} className={`group border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150 ${isChild ? 'bg-gray-50' : 'bg-white'}`}>
        <td className={`px-3 py-2 text-sm text-center ${isChild ? 'pl-6' : ''}`}>
          {index + 1}
        </td>
        <td className={`px-3 py-2 text-sm ${isChild ? 'pl-6' : ''}`}>
          <div className={`font-medium text-gray-900 text-xs leading-tight`}>{test.name}</div>
          {test.sampleTypeName && (
            <div className="text-xs text-gray-400 mt-1">Mẫu: {test.sampleTypeName}</div>
          )}
        </td>
        <td className="px-3 py-2 text-sm">
          <div className={'text-gray-600 text-xs'}>{test.code}</div>
        </td>
        <td className="px-3 py-2 text-sm">
          {result ? (
            <div className={`font-medium text-xs ${getResultStyle(result.color)}`}>
              {result.result || '-'}
            </div>
          ) : (
            <span className="text-gray-400 text-xs">-</span>
          )}
        </td>
        <td className="px-3 py-2 text-sm text-gray-600">
          <div className="text-xs">{result?.resultText || '-'}</div>
        </td>
        <td className="px-3 py-2 text-sm text-gray-600">
          <div className="text-xs">{result?.unit || '-'}</div>
        </td>
        <td className="px-3 py-2 text-sm text-gray-600">
          <div className="text-xs">
            {result?.lowerLimit && result?.higherLimit 
              ? `${result.lowerLimit} - ${result.higherLimit}`
              : result?.lowerLimit || result?.higherLimit || '-'
            }
          </div>
        </td>
        <td className="px-3 py-2 text-sm text-gray-600">
          <div className="text-xs">{result?.normalRange || '-'}</div>
        </td>
        <td className="px-3 py-2 text-sm text-gray-600">
          <div className="text-xs">{result ? getStateText(result.state) : '-'}</div>
        </td>
        <td className="px-3 py-2 text-sm text-center">
          {result?.download ? (
            <span className="text-green-600 text-lg">✓</span>
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
          <td className="px-3 py-3 text-sm text-center">
            {suiteIndex + 1}
          </td>
          <td className="px-3 py-3" colSpan={2}>
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
                 <div className="font-semibold text-blue-900 text-sm">{suite.name}</div>
                 <div className="text-xs text-blue-600">{suite.code}</div>
               </div>
             </button>
           </td>
           <td className="px-3 py-3" colSpan={7}>
           </td>
        </tr>
        {isExpanded && suite.children.map((child, childIndex) => renderTestRow(child, true, childIndex))}
      </React.Fragment>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="w-full px-1 max-w-none min-w-[1100px]">
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg text-center text-gray-600">Đang tải chi tiết kết quả...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="w-full px-2 max-w-none">
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
      <div className="w-full px-2 max-w-none">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            {showBackButton && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại danh sách</span>
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900">Chi tiết kết quả xét nghiệm</h1>
            <p className="text-gray-600 mt-1">ID: {resultId}</p>
          </div>

          {/* Administrative Information Section */}
          {patientInfo && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                Thông tin hành chính
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Họ và tên</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{patientInfo.fullName}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">SID</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{patientInfo.sid}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Số điện thoại</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{patientInfo.phoneNumber}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Ngày sinh</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{patientInfo.dateOfBirth}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Giới tính</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{patientInfo.gender}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Ngày yêu cầu</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{patientInfo.requestDate}</p>
                  </div>
                  <div className="col-span-2 md:col-span-4 lg:col-span-6 flex flex-col pt-2 border-t border-gray-100">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Địa chỉ</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{patientInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          <div className="p-4">
            <div className="w-full shadow-lg rounded-lg overflow-x-auto">
              <table className="w-full min-w-[1200px] table-fixed">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      STT
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                      Tên XN
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Mã XN
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Kết quả ĐT
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                      Kết quả ĐL
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      ĐVT
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                      Ngưỡng dưới/trên
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                      KTC
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Trạng thái
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
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