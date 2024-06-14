import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews($id: ID!) {
    reaview(id: $id)  {
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

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEWS, {
    variables: { id: id },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;
  
  const { title, rating, details } = data.reaview.data.attributes;

  return (
    <div className="">
      <h1 className="text-center mt-20 text-3xl font-semibold text-[#8e2ad6]">
        Review Details
      </h1>
      <div className="review-card">
        <div className="rating">{rating}</div>
        <h2>{title}</h2>
        <p>{details}</p>
      </div>
    </div>
  );
}
