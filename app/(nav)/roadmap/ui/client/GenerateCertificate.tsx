'use client';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import { useEffect } from 'react';

export default function CertificateGenerator() {
  const [formData, setFormData] = useState({
    recipientName: 'John Doe',
    courseName: 'Web Development Fundamentals',
    completionDate: new Date().toLocaleDateString(),
    organizationName: 'DevMate'
  });

  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (certificateRef.current) {
      console.log("Certificate DOM is ready:", certificateRef.current);
    }
  }, []);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `certificate-${formData.recipientName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };
  console.log(certificateRef.current);
  return (
    <div className="min-h-200px bg-gray-50 p-4 m-10 h-10px text-black rounded-md">
      <div className="max-w-7xl mx-auto h-100px">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Certificate Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Name
                  </label>
                  <input disabled
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter recipient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input disabled
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => handleInputChange('courseName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  <input disabled
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Completion Date
                  </label>
                  <input disabled
                    type="text"
                    value={formData.completionDate}
                    onChange={(e) => handleInputChange('completionDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter completion date"
                  />
                </div>
                <button
                  onClick={downloadCertificate}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download as PNG
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Certificate Preview</h2>
              
              <div className="flex justify-center">
                <div className="transform scale-75 origin-top">
                  {/* Certificate Design */}
                  <div
                    ref={certificateRef}
                    className="w-[800px] h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 border-8 border-blue-800 relative overflow-hidden"
                    style={{ fontFamily: 'serif' }}
                  >
                    {/* Decorative Border Pattern */}
                    <div className="absolute inset-4 border-4 border-blue-600 opacity-30"></div>
                    <div className="absolute inset-6 border-2 border-blue-400 opacity-20"></div>

                    {/* Corner Decorations */}
                    <div className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-blue-600"></div>
                    <div className="absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 border-blue-600"></div>
                    <div className="absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 border-blue-600"></div>
                    <div className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-blue-600"></div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center justify-center h-full px-16 text-center relative">
                      {/* Header */}
                      <div className="mb-8">
                        <h1 className="text-5xl font-bold text-blue-900 mb-2 tracking-wide">
                          CERTIFICATE
                        </h1>
                        <h2 className="text-2xl text-blue-700 font-semibold tracking-widest">
                          OF COMPLETION
                        </h2>
                        <div className="mt-4 text-lg text-blue-600 font-medium">
                          {formData.organizationName}
                        </div>
                      </div>

                      {/* Decorative Line */}
                      <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mb-8 rounded"></div>

                      {/* Main Content */}
                      <div className="mb-8">
                        <p className="text-lg text-blue-800 mb-4 font-medium">
                          This is to certify that
                        </p>
                        <h3 className="text-4xl font-bold text-blue-900 mb-6 border-b-2 border-blue-600 pb-2 min-h-[3rem] flex items-center justify-center">
                          {formData.recipientName}
                        </h3>
                        <p className="text-lg text-blue-800 mb-2">
                          has successfully completed the course
                        </p>
                        <h4 className="text-2xl font-semibold text-blue-700 mb-6 min-h-[2rem] flex items-center justify-center">
                          {formData.courseName}
                        </h4>
                      </div>

                      {/* Decorative Elements */}
                      <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white bg-opacity-30"></div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Information */}
                      <div className="flex justify-between items-end w-full absolute bottom-12 left-16 right-16">
                        <div className="text-center">
                          <p className="text-sm text-blue-700 mb-2">Date of Completion</p>
                          <div className="border-b-2 border-blue-800 px-4 pb-1 min-w-[120px]">
                            <span className="text-lg font-semibold text-blue-900">
                              {formData.completionDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-400"></div>
                        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-blue-500"></div>
                        <div className="absolute top-40 right-32 w-16 h-16 rounded-full bg-blue-300"></div>
                        <div className="absolute bottom-40 left-32 w-20 h-20 rounded-full bg-blue-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}