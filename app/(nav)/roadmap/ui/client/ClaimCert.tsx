'use client';
import { useState } from 'react';
import GenerateCertificate from './GenerateCertificate';

export function ClaimCert({ hasCompletedTrack }: { hasCompletedTrack: boolean }) {
  const [showCertificate, setShowCertificate] = useState(false);

  const handleClick = () => {
    console.log("Toggling certificate...");
    setShowCertificate(prev => !prev);
  };

  return (
    <>
      <button
        disabled={!hasCompletedTrack}
        onClick={handleClick}
        className="mt-8 cursor-pointer rounded-lg border border-transparent bg-white px-12 py-3 text-lg font-semibold text-black transition duration-500 hover:border-1 hover:border-white hover:bg-black hover:text-white"
      >
        {showCertificate ? 'Hide Certificate' : 'Claim Certificate'}
      </button>

      {showCertificate && <GenerateCertificate />}
    </>
  );
}