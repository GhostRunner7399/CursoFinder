import styles from './user-box.module.css';
import fijado from '../images/fijado.svg';

function UserBox({ user }) {
  if (!user) return null;

  return (
    <div className={styles['user-identification-box']}>
      <div className={styles['verification-icon']}>
        <img src={fijado} alt="Verified" />
        <span className={styles['verification-text']}>Usuario Identificado</span>
      </div>
      <div className={styles['user-details']}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default UserBox;
