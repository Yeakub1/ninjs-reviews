import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const CATEGORYS = gql`
  query getCategoris {
      categories {
        data {
          id
          attributes {
            name
          }
        }
      }
    } 
`;

export default function SideHeader() {
  const { loading, error, data } = useQuery(CATEGORYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;
  const categories = data?.categories?.data ?? [];

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Ninja Reviews</h1>
      </Link>
      <nav className="categories">
        <span className="">Filter reviews by category: </span>
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
