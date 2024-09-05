import TextHeader from "@/components/shared/TextHeader";
import React from "react";
import AddComment from "./AddComment";

export default function ProductComments({ id }) {
  return (
    <section>
      <TextHeader
        title="Product Comments"
        // subtitle={`${data.comments.length} comments`}
      />
      <AddComment productId={id} />
    </section>
  );
}
