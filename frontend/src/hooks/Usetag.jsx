import { useState } from "react";

const useTag = (maxTags = 5) => {
  const [tags, setTags] = useState([]);

  const handleAddTag = (newTag) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));

  return { tags, handleAddTag, handleRemoveTag };
};

export default useTag;
