import sanityClient from "../client";
// The import order DOES MATTER here. If you change it, you'll get an error!
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

// components
import Link from "next/link";
import HeroImage from "../src/components/HeroImage/HeroImage";
import { PortableText } from "@portabletext/react";
import { generateImgSrc } from "../src/utils/generateImgSrc";

export default function IndexPage({ homeData }) {

  // const components = {
  //   types: {
  //     block: ({ children }) => <div>{children}</div>,
  //     span: ({ children }) => <span>{children}</span>,
  //     undefined: ({ children }) => <span>{children}</span>
  //   },
  //   marks: {
  //     strong: ({ children }) => <em>{children}</em>
  //   }
  // }

  return (
    <>
      <main>
        <h1 className="headline">{homeData[0].headline}</h1>
        <HeroImage></HeroImage>
        <section>
          {/* <PortableText value={[homeData[0].text1[0].children]} components={components} /> */}
          <p>
            {/* TODO auslagern in eigene funktion (utils) */}
            {homeData[0].text1.map(textblock => {
              return <>{textblock.children.map(textElement => {
                const openingTags = textElement.marks.length > 0 ? textElement.marks.map(mark => `<${mark}>`) : '';
                const textPart = textElement.text;
                const closingTags = textElement.marks.length > 0 ? textElement.marks.map(mark => `</${mark}>`) : '';
                const fullBlock = openingTags + textPart + closingTags;
                return <span dangerouslySetInnerHTML={{ __html: fullBlock }}></span>
              })} <br /></>
            })}
          </p>
          {homeData[0].heroImage &&
            <div className="flyer"><img src={generateImgSrc(homeData[0].heroImage.asset._ref)} /></div>
          }
          <br />
          <h2>{homeData[0].headline2}</h2>
          <p>{homeData[0].text2}</p>
        </section>
      </main>
    </>
  );
}


export async function getStaticProps() {
  const homeData = await sanityClient.fetch(`*[_type == "home"]`);

  return {
    props: {
      homeData,
    }
  };
}