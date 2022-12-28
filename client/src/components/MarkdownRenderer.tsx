import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled, { createGlobalStyle } from 'styled-components';
type MarkdownRendererProps = {
  content: string;
};
export default function MarkdownRenderer(props: MarkdownRendererProps) {
  const { content } = props;
  return (
    <div>
      <DetailDiv>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </DetailDiv>
    </div>
  );
}
const DetailDiv = styled.div`
  line-height: 2;
  & h1 {
    font-size: 2em;
    font-weight: bolder;
  }
  & h2 {
    font-size: 1.5em;
    font-weight: bolder;
  }
  & h3 {
    font-size: 1.17em;
    font-weight: bolder;
  }
  & h4 {
    font-size: 1em;
    font-weight: bolder;
  }
  & h5 {
    font-size: 0.83em;
    font-weight: bolder;
  }
  & h6 {
    font-size: 0.67em;
    font-weight: bolder;
  }
  & strong {
    font-weight: bold;
  }
  & p {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
  }
  i {
    font-style: italic;
  }
  li {
    display: list-item;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1 em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }
  a:link,
  a:visited {
    color: (internal value);
    text-decoration: underline;
    cursor: auto;
  }
  a:link:active,
  a:visited:active {
    color: (internal value);
  }
`;
