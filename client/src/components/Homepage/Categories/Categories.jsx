import React from "react";
import styles from "./Categories.module.css";

// images
import aptitude from "../../../assets/homepageimages/CategoriesIcons/mindset 1.svg";
import development from "../../../assets/homepageimages/CategoriesIcons/coding 2.svg";
import coding from "../../../assets/homepageimages/CategoriesIcons/laptop 2.svg";
import aiml from "../../../assets/homepageimages/CategoriesIcons/lightbulb 1.svg";
import design from "../../../assets/homepageimages/CategoriesIcons/laptop 1.svg";
import cybersecurity from "../../../assets/homepageimages/CategoriesIcons/security 1.svg";
import devops from "../../../assets/homepageimages/CategoriesIcons/settings (1) 1.svg";
import arvr from "../../../assets/homepageimages/CategoriesIcons/virtual-reality 1.svg";
import blockchain from "../../../assets/homepageimages/CategoriesIcons/blockchain_4524673 1.svg";
import web3 from "../../../assets/homepageimages/CategoriesIcons/web3 1.svg";

const Tags = ({ bgColor, tagName, imgsrc }) => {
  return (
    <div
      className={styles.tagContainer}
      style={{ "--hover-bg-color": bgColor }}
    >
      <div style={{ background: bgColor }}>
        <img src={imgsrc} alt="tag" />
      </div>
      <div className={styles.tagTxt}>{tagName}</div>
    </div>
  );
};

const Categories = () => {
  const Categorytags = [
    [
      {
        id: 1,
        imgsrc: aptitude,
        bgColor: "#FFD4F2",
        tagName: "Aptitude",
      },
      {
        id: 2,
        imgsrc: development,
        bgColor: "rgba(255, 191, 132, 0.32)",
        tagName: "Development",
      },
      {
        id: 3,
        imgsrc: coding,
        bgColor: "rgba(48, 156, 255, 0.3)",
        tagName: "Coding",
      },
    ],
    [
      {
        id: 4,
        imgsrc: aiml,
        bgColor: "rgba(48, 255, 131, 0.3)",
        tagName: "AI/ML",
      },
      {
        id: 5,
        imgsrc: design,
        bgColor: "rgba(48, 156, 255, 0.2)",
        tagName: "Design",
      },
      {
        id: 6,
        imgsrc: cybersecurity,
        bgColor: "#FCBFC3",
        tagName: "Cybersecurity",
      },
      {
        id: 7,
        imgsrc: devops,
        bgColor: "#F0FD9F",
        tagName: "DevOps",
      },
    ],
    [
      {
        id: 8,
        imgsrc: arvr,
        bgColor: "#B3B3B3",
        tagName: "AR/VR",
      },
      {
        id: 9,
        imgsrc: blockchain,
        bgColor: "#FDC4DC",
        tagName: "Blockchain",
      },
      {
        id: 10,
        imgsrc: web3,
        bgColor: "#FFDD86",
        tagName: "Web3",
      },
    ],
  ];

  return (
    <div className={styles.maincontainer}>
      {/* section 1 */}
      <div className={styles.container1}>
        <div className={styles.containerTxt1}>
          Compete Across Various Categories
        </div>
        <div className={styles.containerTxt1}>
          <span className={styles.cyanTxt}>Test</span> Your Skills &{" "}
          <span className={styles.cyanTxt}>Rise</span> to the Top
        </div>
      </div>
      {/* section 2 */}
      <div className={styles.container2}>
        <div
          style={{
            display: "flex",
            flexDirection: "flex-row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "0 auto",
          }}
        >
          {Categorytags[0].map((tag) => (
            <Tags
              key={tag.id}
              bgColor={tag.bgColor}
              tagName={tag.tagName}
              imgsrc={tag.imgsrc}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "flex-row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "0 auto",
          }}
        >
          {Categorytags[1].map((tag) => (
            <Tags
              key={tag.id}
              bgColor={tag.bgColor}
              tagName={tag.tagName}
              imgsrc={tag.imgsrc}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "flex-row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "0 auto",
          }}
        >
          {Categorytags[2].map((tag) => (
            <Tags
              key={tag.id}
              bgColor={tag.bgColor}
              tagName={tag.tagName}
              imgsrc={tag.imgsrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
