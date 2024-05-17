import Modal from "../../components/shared/Modal";
import Error from "../../components/shared/Error";

interface ErrorPageProps {
  message?: string;
}

function ErrorPage({ message }: ErrorPageProps) {
  return (
    <Modal>
      <Error message={message} />
    </Modal>
  );
}

export default ErrorPage;
