import Modal from "../../components/shared/Modal";
import Error from "../../components/shared/Error";

function ErrorPage({ message }) {
  return (
    <Modal>
      <Error message={message} />
    </Modal>
  );
}

export default ErrorPage;
