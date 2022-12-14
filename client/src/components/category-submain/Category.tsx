import CategoryNav from './CategoryNav';
import ItemCard from './ItemCard';

export default function Category() {
  return (
    <div className="">
      <CategoryNav />
      <div className="max-w-screen-lg ">
        <ItemCard />
      </div>
    </div>
  );
}
