import YoutubePlayer from "../YoutubePlayer";
import Modal from "../Modal";

import "./trailer-dialog.scss";

const TrailerDialog = ({ isOpen, closeModal, videoKey }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {videoKey ? (
        <YoutubePlayer videoKey={videoKey} />
      ) : (
        <div className="no-trailer-msg">
          <h6>No trailer available. Try another movie</h6>
        </div>
      )}
    </Modal>
  );
};

export default TrailerDialog;
