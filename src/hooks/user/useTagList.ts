import { useEffect, useState, useCallback } from "react";

type Tag = {
  id: number;
  tag: string;
};

type TagListProps = {
  defaultTags: Tag[];
  onTagsChange: (tags: string[]) => void;
};

const cleanTagText = (text: string): string => {
  return text.replace(/#/g, "");
};

export function useTagList({ defaultTags = [], onTagsChange }: TagListProps) {
  const [tagList, setTagList] = useState<string[]>(() =>
    defaultTags.map((item) => item.tag),
  );

  const addTag = useCallback((value: string) => {
    if (value.trim() && value.length <= 5) {
      const cleanedTag = cleanTagText(value);
      setTagList((prev) => [...prev, cleanedTag]);
      return true;
    }
    return false;
  }, []);

  const deleteTag = useCallback((indexToDelete: number) => {
    setTagList((prev) => prev.filter((_, idx) => idx !== indexToDelete));
  }, []);

  const deleteLastTag = useCallback(() => {
    setTagList((prev) => prev.slice(0, -2));
  }, []);

  const handleTagsChange = useCallback(
    (tags: string[]) => {
      onTagsChange(tags);
    },
    [onTagsChange],
  );

  useEffect(() => {
    handleTagsChange(tagList);
  }, [tagList, handleTagsChange]);

  return {
    tagList,
    addTag,
    deleteTag,
    deleteLastTag,
    isMaxTags: tagList.length >= 3,
  };
}
