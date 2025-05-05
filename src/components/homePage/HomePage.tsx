interface Projects {
  title: string;
  desc: string;
  url: string;
}

interface HomePageProps {
  handleClick: (url: string) => void;
}

export default function HomePage({ handleClick }: HomePageProps) {
  const projects: Projects[] = [
    {
      title: "Todo App",
      desc: "This app allows you to create an basic todo list",
      url: "/todoApp",
    },
  ];

  return (
    <div className="p-4 min-h-dvh max-w-[1200px] mx-auto">
      <h3 className="text-center ">
        This is a webpage that contains several basic react interview projects.
      </h3>
      <div className="">
        <h4 className="font-bold text-xl">Projects</h4>
        <div className="my-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div className=" p-4 shadow-lg flex flex-col gap-3" key={index}>
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p>{project.desc}</p>
              <button
                className="bg-blue-400 px-5 py-2 rounded-2xl w-fit text-white hover:-translate-y-1 hover:cursor-pointer transition-all"
                onClick={() => handleClick(project.url)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
