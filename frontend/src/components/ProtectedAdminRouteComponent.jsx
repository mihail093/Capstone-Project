import { useAuth } from '../utils/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  // Se l'utente non è autenticato o non è admin, non renderizza nulla
  if (!user || user.role !== 'admin') {
    return (
        <div className='w-full flex justify-center m-2'>
            <p className='font-title text-xl text-myRed'>Spiacente, non sei autorizzato ad accedere a questa pagina</p>
        </div>
    )
  }

  // Se l'utente è admin, renderizza il contenuto
  return children;
};

export default ProtectedAdminRoute;