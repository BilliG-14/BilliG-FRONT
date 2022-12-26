import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createGlobalStyle } from 'styled-components';
type MarkdownRendererProps = {
  content: string;
};
export default function MarkdownRenderer(props: MarkdownRendererProps) {
  const { content } = props;
  return (
    <div>
      <GlobalStyle />
      <article>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </article>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  article {
    line-height: 2.5;
  }
  h1 {
    font-size: 2em;
    font-weight: bolder;
  }
  h2 {
    font-size: 1.5em;
    font-weight: bolder;
  }
  h3 {
    font-size: 1.17em;
    font-weight: bolder;
  }
  h4 {
    font-size: 1em;
    font-weight: bolder;
  }
  h5 {
    font-size: .83em;
    font-weight: bolder;
  }
  h6 {
    font-size: .67em;
    font-weight: bolder;
  }
`;
