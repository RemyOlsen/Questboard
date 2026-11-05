import styled from "styled-components";

interface ColumnProps {
  gap?: string;
  align?: string;
  justify?: string;
}

/**
 * Column is a styled component that creates a flexible column layout using CSS Flexbox.
 * It accepts several props to customize its appearance and behavior:
 * - gap: Defines the space between child elements. Defaults to "1rem" if not provided.
 * - align: Sets the alignment of items along the cross axis (horizontal alignment). Defaults to "center".
 * - justify: Sets the alignment of items along the main axis (vertical alignment). Defaults to "flex-start".
 *
 * This component is useful for creating responsive layouts where elements need to be arranged in a column with specific spacing and alignment.
 */
const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap ?? "1rem"};
  align-items: ${(props) => props.align ?? "center"};
  justify-content: ${(props) => props.justify ?? "flex-start"};
`;

export default Column;
