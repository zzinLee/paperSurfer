import Modal from "../../components/shared/Modal";
import Error from "../../components/shared/Error";

function ErrorPage({ message }: { message?: string }) {
  return (
    <Modal>
      <Error message={message} />
    </Modal>
  );
}

export default ErrorPage;
