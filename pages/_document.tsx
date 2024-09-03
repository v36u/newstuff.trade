import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  // eslint-disable-next-line
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="flex flex-col">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
