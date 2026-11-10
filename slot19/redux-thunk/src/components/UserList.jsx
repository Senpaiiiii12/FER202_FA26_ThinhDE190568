import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { fetchUsers, fetchPostsByUser } from '../redux/users/userActions';

export default function UserList() {
  const { items, loading, error, selectedId } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());          // dispatch một HÀM – nhờ redux-thunk
  }, [dispatch]);

  if (loading) return <div className="text-center p-4"><Spinner animation="border" /></div>;
  if (error)
    return (
      <Alert variant="danger">
        {error} <Button size="sm" onClick={() => dispatch(fetchUsers())}>Thử lại</Button>
      </Alert>
    );

  return (
    <ListGroup>
      {items.map((u) => (
        <ListGroup.Item
          key={u.id}
          action
          active={u.id === selectedId}
          onClick={() => dispatch(fetchPostsByUser(u.id))}
        >
          <div className="fw-bold">{u.name}</div>
          <small>{u.email} · {u.company.name}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}