import TextHeader from "@/components/shared/TextHeader";
import React from "react";
import AddComment from "./AddComment";
import { getProductComment } from "@/actions/product.action";
import ShowComments from "./ShowComments";

export default async function ProductComments({ id }) {
  const data = await getProductComment(id);

  return (
    <section>
      <TextHeader
        title="Product Comments"
        subtitle={`${data.comments.length} comments`}
      />
      <AddComment productId={id} />
      {data.comments.length > 0 && (
        <ShowComments comments={JSON.parse(JSON.stringify(data.comments))} />
      )}
    </section>
  );
}
