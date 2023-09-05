import { useNavigate as useNavigateOriginal } from 'react-router-dom';

const useNavigate = () => {
  const navigate = useNavigateOriginal();

  return {
    goTo: (url) => navigate(url),
  };
};

export default useNavigate;
