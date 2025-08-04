"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { getValidToken } from "@/utils/auth";

// Types
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

interface TestInfo {
  shortName: string | null;
  id: number;
  testCode: string;
  testName: string;
  release: string | null;
  quickCode: string | null;
  customName: string | null;
  type: number;
  typeName: string | null;
  reportTypeName: string;
  reportType: string;
  sampleType: string;
  sampleTypeName: string;
  subSID: string | null;
  profiles: string | null;
  profileName: string | null;
  category: string;
  categoryName: string;
  displayOrder: number;
  tags: string | null;
  remark: string | null;
  inUse: boolean;
  testMethod: string | null;
  iso: boolean;
  defaultValue: string;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  unit: string;
  updatedDate: string;
  profileCode: string | null;
}

// Constants
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

const STATE_MAPPING: { [key: number]: string } = {
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
  99: "Đã gửi KQ",
};

// Utility functions
const getResultStyle = (color: string): string => {
  switch (color) {
    case "0":
      return "text-black text-center";
    case "1":
      return "text-blue-600 text-left";
    case "2":
      return "text-red-600 text-right";
    default:
      return "text-black text-center";
  }
};

const getStateText = (state: number): string => {
  return STATE_MAPPING[state] || "-";
};

const transformTestInfoToProfile = (testInfo: TestInfo): TestProfile => ({
  id: testInfo.id,
  code: testInfo.testCode,
  name: testInfo.testName,
  type: testInfo.type,
  category: testInfo.category,
  categoryName: testInfo.categoryName,
  parentId: 0,
  parentName: null,
  parentCode: null,
  sampleType: testInfo.sampleType,
  sampleTypeName: testInfo.sampleTypeName,
  displayOrder: testInfo.displayOrder,
  status: testInfo.inUse,
  effectiveTime: testInfo.createdDate,
  children: [],
  hasChildren: false,
});

// Custom hooks
const useDetailedResultData = (resultId: number) => {
  const [data, setData] = useState({
    profileData: [] as ProfileData[],
    testProfiles: [] as TestProfile[],
    testResults: [] as TestResult[],
    finalComment: null as FinalComment | null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getValidToken();
      if (!token) {
        throw new Error("No valid token found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Parallel API calls where possible
      const [profileResponse, testResultsResponse, commentResponse] =
        await Promise.allSettled([
          fetch(
            `${BASE_URL}/api/la/v1/results/${resultId}/profile-updateresults?isTestSend=false`,
            { headers }
          ),
          fetch(
            `${BASE_URL}/api/la/v1/results/${resultId}/test-updateresults?isTestSend=false&isMBTest=false`,
            { headers }
          ),
          fetch(`${BASE_URL}/api/la/v1/results/${resultId}/result-comment`, {
            headers,
          }),
        ]);

      // Handle profile data
      if (profileResponse.status === "rejected" || !profileResponse.value.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const profiles: ProfileData[] = await profileResponse.value.json();

      // Handle test results
      if (
        testResultsResponse.status === "rejected" ||
        !testResultsResponse.value.ok
      ) {
        throw new Error("Failed to fetch test results");
      }
      const testResultsData = await testResultsResponse.value.json();
      const filteredResults: TestResult[] = testResultsData.map(
        (result: any) => ({
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
          color: result.color,
        })
      );

      // Handle final comment
      let finalCommentData: FinalComment | null = null;
      if (commentResponse.status === "fulfilled" && commentResponse.value.ok) {
        finalCommentData = await commentResponse.value.json();
      }

      // Fetch test profiles if we have profile data
      let testProfilesData: TestProfile[] = [];
      if (profiles.length > 0) {
        const codes = profiles.map((profile) => ({
          Code: profile.profileCode,
          EffectiveTime: profile.effectiveTime,
        }));

        const testProfileResponse = await fetch(
          `${BASE_URL}/api/la/v1/profiles/getFullTestProfileByListCode`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ codes }),
          }
        );

        if (testProfileResponse.ok) {
          testProfilesData = await testProfileResponse.json();
        }
      }

      // Handle tests without profile codes
      const testsWithoutProfile = testResultsData.filter(
        (result: any) => result.profileCode === null
      );
      if (testsWithoutProfile.length > 0) {
        const payLoadTest = testsWithoutProfile.map((result: any) => ({
          TestCode: result.testCode,
          EffectiveTime: result.effectiveTime,
        }));

        const testByListCodeResponse = await fetch(
          `${BASE_URL}/api/la/v1/tests/GetTestByListCode`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ codes: payLoadTest }),
          }
        );

        if (testByListCodeResponse.ok) {
          const testInfos: TestInfo[] = await testByListCodeResponse.json();
          const newProfiles = testInfos.map(transformTestInfoToProfile);
          testProfilesData = [...testProfilesData, ...newProfiles];
        }
      }

      setData({
        profileData: profiles,
        testProfiles: testProfilesData,
        testResults: filteredResults,
        finalComment: finalCommentData,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [resultId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
};

// Components
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gray-50 pt-32 pb-20">
    <div className="w-full px-1 max-w-none min-w-[1100px]">
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-center text-gray-600">
            Đang tải chi tiết kết quả...
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ErrorDisplay: React.FC<{
  error: string;
  onBack: () => void;
  onRetry: () => void;
}> = ({ error, onBack, onRetry }) => (
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
          <div className="text-red-600 text-lg font-semibold mb-2">
            Có lỗi xảy ra
          </div>
          <div className="text-gray-600">{error}</div>
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PatientInfoSection: React.FC<{ patientInfo: PatientInfo }> = ({
  patientInfo,
}) => (
  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
      <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
      Thông tin hành chính
    </h3>
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-3">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Họ và tên
          </span>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {patientInfo.fullName}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            SID
          </span>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {patientInfo.sid}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Số điện thoại
          </span>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {patientInfo.phoneNumber}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Ngày sinh
          </span>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {patientInfo.dateOfBirth}
          </p>
        </div>
        {/* <div className="flex flex-col">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Giới tính
          </span>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {patientInfo.gender}
          </p>
        </div> */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Ngày yêu cầu
          </span>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {patientInfo.requestDate}
          </p>
        </div>
        <div className="col-span-2 md:col-span-4 lg:col-span-6 flex flex-col pt-2 border-t border-gray-100">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Địa chỉ
          </span>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {patientInfo.address}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TestRow: React.FC<{
  test: TestProfile;
  result: TestResult | undefined;
  isChild?: boolean;
  index: number;
}> = ({ test, result, isChild = false, index }) => (
  <tr
    key={test.id}
    className={`group border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150 ${
      isChild ? "bg-gray-50" : "bg-white"
    }`}
  >
    <td className={`px-3 py-2 text-sm text-center ${isChild ? "pl-6" : ""}`}>
      {index + 1}
    </td>
    <td className={`px-3 py-2 text-sm ${isChild ? "pl-6" : ""}`}>
      <div className="font-medium text-gray-900 text-xs leading-tight">
        {test.name}
      </div>
      {test.sampleTypeName && (
        <div className="text-xs text-gray-400 mt-1">
          Mẫu: {test.sampleTypeName}
        </div>
      )}
    </td>
    <td className="px-3 py-2 text-sm">
      <div className="text-gray-600 text-xs">{test.code}</div>
    </td>
    <td className="px-3 py-2 text-sm">
      {result ? (
        <div className={`font-medium text-xs ${getResultStyle(result.color)}`}>
          {result.result || "-"}
        </div>
      ) : (
        <span className="text-gray-400 text-xs">-</span>
      )}
    </td>
    <td className="px-3 py-2 text-sm text-gray-600">
      <div className="text-xs">{result?.resultText || "-"}</div>
    </td>
    <td className="px-3 py-2 text-sm text-gray-600">
      <div className="text-xs">{result?.lowerLimit || "-"}</div>
    </td>
    <td className="px-3 py-2 text-sm text-gray-600">
      <div className="text-xs">{result?.higherLimit || "-"}</div>
    </td>
    <td className="px-3 py-2 text-sm text-gray-600">
      <div className="text-xs">{result?.normalRange || "-"}</div>
    </td>
    <td className="px-3 py-2 text-sm text-gray-600">
      <div className="text-xs">{result?.unit || "-"}</div>
    </td>
    <td className="px-3 py-2 text-sm text-gray-600">
      <div className="text-xs">{result ? getStateText(result.state) : "-"}</div>
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

const TestSuite: React.FC<{
  suite: TestProfile;
  suiteIndex: number;
  isExpanded: boolean;
  onToggle: (suiteCode: string) => void;
  findTestResult: (testCode: string) => TestResult | undefined;
}> = ({ suite, suiteIndex, isExpanded, onToggle, findTestResult }) => (
  <React.Fragment key={suite.id}>
    <tr className="border-b border-gray-200 bg-blue-50">
      <td className="px-3 py-3 text-sm text-center">{suiteIndex + 1}</td>
      <td className="px-3 py-3" colSpan={2}>
        <button
          onClick={() => onToggle(suite.code)}
          className="flex items-center space-x-2 text-left w-full hover:text-blue-700"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-blue-600" />
          )}
          <div>
            <div className="font-semibold text-blue-900 text-sm">
              {suite.name}
            </div>
            <div className="text-xs text-blue-600">{suite.code}</div>
          </div>
        </button>
      </td>
      <td className="px-3 py-3" colSpan={8}></td>
    </tr>
    {isExpanded &&
      suite.children.map((child, childIndex) => (
        <TestRow
          key={child.id}
          test={child}
          result={findTestResult(child.code)}
          isChild={true}
          index={childIndex}
        />
      ))}
  </React.Fragment>
);

const FinalCommentSection: React.FC<{ finalComment: FinalComment }> = ({
  finalComment,
}) => (
  <div className="p-6 border-t border-gray-200 bg-gray-50">
    <div className="flex items-start space-x-3">
      <FileText className="w-5 h-5 text-blue-600 mt-1" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Kết luận</h3>
        <p className="text-gray-700 whitespace-pre-wrap">
          {finalComment.finalComment}
        </p>
        <div className="text-xs text-gray-500 mt-2">
          Cập nhật: {new Date(finalComment.updatedDate).toLocaleString("vi-VN")}
        </div>
      </div>
    </div>
  </div>
);

// Main component
const DetailedResultView: React.FC<DetailedResultViewProps> = ({
  resultId,
  onBack,
  showBackButton = true,
  patientInfo: providedPatientInfo,
}) => {
  const { testProfiles, testResults, finalComment, loading, error, refetch } =
    useDetailedResultData(resultId);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(
    providedPatientInfo || null
  );
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (providedPatientInfo) {
      setPatientInfo(providedPatientInfo);
    }
  }, [providedPatientInfo]);

  const toggleSuiteExpansion = useCallback((suiteCode: string) => {
    setExpandedSuites((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(suiteCode)) {
        newExpanded.delete(suiteCode);
      } else {
        newExpanded.add(suiteCode);
      }
      return newExpanded;
    });
  }, []);

  const findTestResult = useCallback(
    (testCode: string): TestResult | undefined => {
      return testResults.find((result) => result.testCode === testCode);
    },
    [testResults]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onBack={onBack} onRetry={refetch} />;
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
            <h1 className="text-2xl font-bold text-gray-900">
              Chi tiết kết quả xét nghiệm
            </h1>
            <p className="text-gray-600 mt-1">ID: {resultId}</p>
          </div>

          {/* Patient Information */}
          {patientInfo && <PatientInfoSection patientInfo={patientInfo} />}

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
                      Ngưỡng dưới
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Ngưỡng trên
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      KTC
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      ĐVT
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
                      return (
                        <TestSuite
                          key={profile.id}
                          suite={profile}
                          suiteIndex={index}
                          isExpanded={expandedSuites.has(profile.code)}
                          onToggle={toggleSuiteExpansion}
                          findTestResult={findTestResult}
                        />
                      );
                    } else {
                      return (
                        <TestRow
                          key={profile.id}
                          test={profile}
                          result={findTestResult(profile.code)}
                          isChild={false}
                          index={index}
                        />
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Final Comment */}
          {finalComment && finalComment.finalComment && (
            <FinalCommentSection finalComment={finalComment} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedResultView;
