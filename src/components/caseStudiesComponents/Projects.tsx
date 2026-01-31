import TagLines from "../common/TagLines";
import Title from "../common/Title";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    // Wrap everything in a single parent or a Fragment <>
    <div className="section-padding-x section-padding-y">
      {/* Heading Section */}
      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center ">
        <TagLines>Projects</TagLines>
        <Title level="title48" className="text-white">
          Case Studies
        </Title>
        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl text-center font-inter">
          Real results from real SEO & marketing campaigns.
        </p>
      </div>

      {/* Grid Section - Now inside the parent div */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10 font-inter">
        <ProjectCard />
      </div>
    </div>
  );
};

export default Projects;
