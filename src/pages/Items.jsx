import ItemsList from "../components/ItemsList";
import '../styles/tables.css'

export default function Items() {
  return (
    <div className="container mt-5">
      <h2>Gestión de Items</h2>
      <ItemsList />
    </div>
  );
}
