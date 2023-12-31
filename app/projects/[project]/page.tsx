import Project from "./project";
import projectData from "../../data/projects.json";
import { projectProps } from "@components/ProjectEntry";

export async function generateStaticParams() {
    //const projects = await fetch('https://.../projects').then((res) => res.json())
    const projects = projectData.projects;

    return projects.map((p) => ({
      project: p.name,
    }))
} 

export default function Page({ params }: { params: projectProps}) {
    return <Project />
}