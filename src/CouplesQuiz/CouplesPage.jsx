import { useState } from 'react';
import CouplesMain from './CouplesMain';
import CouplesShow from './CouplesShow';
import { Modal } from '../Modal';

function CouplesPage() {
  const [isCouplesShowVisible, setIsCouplesShowVisible] = useState(false);

  const handleCouplesShow = () => {
    setIsCouplesShowVisible(true);
  };

  return (
    <main>
      <div>
        <CouplesMain onShow={handleCouplesShow} />
        <Modal show={isCouplesShowVisible} onClose={() => setIsCouplesShowVisible(false)}>
          <CouplesShow />
        </Modal>
      </div>
    </main>
  )
}

export default CouplesPage;