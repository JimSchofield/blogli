import { ItemIndex } from "../types/items";

export default function (data: {
  content: string;
  itemIndex: ItemIndex;
}): string {
  const { content, itemIndex } = data;
  return `
    ${content}
    <ul>
      ${itemIndex
        .map((item) => {
          return `
          <li><a href="${item.url}">${item.title}</a></li>
        `;
        })
        .join("")}
    </ul>
  `;
}
