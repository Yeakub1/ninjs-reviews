import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
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
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(REVIEWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const reviews = data?.reaviews?.data ?? [];
  
  return (
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
  );
}
