/**
 * @see https://www.npmjs.com/package/react-syntax-highlighter
 */
/// <reference types="react" />
declare const Highlighter: ({ language, content, visible }: {
    language?: string;
    content: string;
    visible?: boolean;
}) => JSX.Element;
export default Highlighter;
