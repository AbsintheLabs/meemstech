// create a simple nextjs page
// Page.tsx
import type { NextPage } from 'next';
import { useCallback } from 'react';

const Page: NextPage = () => {
  const urlToCopy = 'https://example.com';

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(urlToCopy).then(() => {
      // Notify the user that the text was copied successfully
      alert('URL copied to clipboard!');
    }).catch((err) => {
      // Handle any errors
      console.error('Failed to copy text to clipboard', err);
    });
  }, [urlToCopy]);

  return (
    <div>
      <button onClick={copyToClipboard}>Copy URL to Clipboard</button>
      <p>hello world</p>
    </div>
  );
};

export default Page;

