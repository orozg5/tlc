import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import Head from "next/head";
import "swagger-ui-react/swagger-ui.css";

// @ts-ignore
const SwaggerUI = dynamic<{ spec: any }>(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: "html,body { background-color: white !important; color: black !important; } ",
          }}
        />
      </Head>
      <SwaggerUI spec={spec} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "src/pages/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
    },
  });

  return {
    props: {
      spec,
      isSwagger: true,
    },
  };
};

export default ApiDoc;
