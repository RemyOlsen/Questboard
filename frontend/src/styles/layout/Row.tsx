import styled from "styled-components";

interface RowProps {
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: boolean;
}

/**
 * Row is a styled component that creates a flexible row layout using CSS Flexbox.
 * It accepts several props to customize its appearance and behavior:
 * - gap: Defines the space between child elements. Defaults to "1rem" if not provided.
 * - align: Sets the alignment of items along the cross axis (vertical alignment). Defaults to "center".
 * - justify: Sets the alignment of items along the main axis (horizontal alignment). Defaults to "flex-start".
 * - wrap: A boolean that determines whether the row should wrap its children onto multiple lines. Defaults to false (no wrapping).
 *
 * This component is useful for creating responsive layouts where elements need to be arranged in a row with specific spacing and alignment.
 */
const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap ?? "1rem"};
  align-items: ${(props) => props.align ?? "center"};
  justify-content: ${(props) => props.justify ?? "flex-start"};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
`;

export default Row;
