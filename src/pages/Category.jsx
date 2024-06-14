import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    categorie(id: $id) {
      data {
        attributes {
          name
          reaviews {
            data {
              id
              attributes {
                title
                rating
                details
              }
            }
          }
        }
      }
    }
  }
`;



export default function Category() {

 const { id } = useParams();
 const { loading, error, data } = useQuery(GET_CATEGORY, {
   variables: { id: id },
 });

 if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;
  const reviews = data?.categorie?.data?.attributes?.reaviews?.data || [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#8e2ad6]">
        {data.categorie.data.attributes.name}
      </h2>
      <div>
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <h2>{review.attributes.title}</h2>
            <p className="rating">{review.attributes.rating}</p>
            <p>{review.attributes.details.slice(0, 200)}...</p>
            <Link to={`/details/${review.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
